const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const packageJson = require("./package.json");

// 1. Dynamic Theme Discovery
const themesDir = path.resolve(__dirname, "themes");
const discoveredThemes = fs.readdirSync(themesDir).filter(f => 
    fs.statSync(path.join(themesDir, f)).isDirectory()
);

// 2. Configuration Setup
const THEME_ALIASES = {};
const TAILWIND_CONTENT_PATHS = [];
const SASS_INCLUDE_PATHS = [path.resolve(__dirname, "node_modules")];
const ENTRIES = {
    'admin-ui-kit': "./themes/neo/index.js" // Main legacy entry (Neo as default)
};

// Static Asset Sources
const commonJsDir = path.resolve(__dirname, "common/js");
const commonCssDir = path.resolve(__dirname, "common/css");
const commonImgDir = path.resolve(__dirname, "common/img");
const commonFontsDir = path.resolve(__dirname, "common/fonts");

const copyPatterns = [];

discoveredThemes.forEach(theme => {
    const themeRoot = path.resolve(themesDir, theme);
    const themeStaticDir = path.resolve(themesDir, theme, 'static');
    
    // Aliases: @hashtagcms/theme/modern -> .../themes/modern
    THEME_ALIASES[`@hashtagcms/theme/${theme}`] = themeRoot;
    
    // Tailwind scan paths
    // Scan everything in the theme folder
    TAILWIND_CONTENT_PATHS.push(`./themes/${theme}/**/*.{vue,js,scss,blade.php}`);
    
    // Sass include paths
    const stylesDir = path.join(themeRoot, 'styles');
    if (fs.existsSync(stylesDir)) {
        SASS_INCLUDE_PATHS.push(stylesDir);
    }
    
    // Entries: modern/admin-ui-kit -> ./themes/modern/index.js
    ENTRIES[`${theme}/admin-ui-kit`] = `./themes/${theme}/index.js`;

    // Copy Patterns
    // 1. Common JS (Vendors) -> dist/<theme>/js
    if (fs.existsSync(commonJsDir)) {
      copyPatterns.push({
        from: commonJsDir,
        to: path.resolve(__dirname, "dist", theme, "js"),
        noErrorOnMissing: true
      });
    }

    // 2. Common CSS -> dist/<theme>/css
    if (fs.existsSync(commonCssDir)) {
      copyPatterns.push({
        from: commonCssDir,
        to: path.resolve(__dirname, "dist", theme, "css"),
        noErrorOnMissing: true
      });
    }

    // 3. Common Images -> dist/<theme>/img
    if (fs.existsSync(commonImgDir)) {
      copyPatterns.push({
        from: commonImgDir,
        to: path.resolve(__dirname, "dist", theme, "img"),
        noErrorOnMissing: true
      });
    }

    // 4. Common Fonts -> dist/<theme>/fonts
    if (fs.existsSync(commonFontsDir)) {
      copyPatterns.push({
        from: commonFontsDir,
        to: path.resolve(__dirname, "dist", theme, "fonts"),
        noErrorOnMissing: true
      });
    }

    // 5. Theme Specific Static Assets -> dist/<theme>/
    if (fs.existsSync(themeStaticDir)) {
      copyPatterns.push({
        from: themeStaticDir,
        to: path.resolve(__dirname, "dist", theme),
        noErrorOnMissing: true
      });
    }
});

// Helper aliases
const ALIASES = {
  ...THEME_ALIASES,
  "@hashtagcms/helpers": path.resolve(__dirname, "helpers"),
};

console.log('Building themes:', discoveredThemes);

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode || "development",
    entry: ENTRIES,
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].min.js" : "[name].js",
      publicPath: "auto",
      library: {
        name: "HashtagCmsAdminUI",
        type: "umd",
      },
      globalObject: "this",
      clean: true,
    },
    externals: {
      vue: "vue",
      axios: "axios",
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            MiniCssExtractPlugin.loader, 
            "css-loader", 
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    require("@tailwindcss/postcss")({
                      content: TAILWIND_CONTENT_PATHS
                    }),
                    require("autoprefixer")
                  ]
                }
              }
            },
            {
                loader: "sass-loader",
                options: {
                    sassOptions: {
                        includePaths: SASS_INCLUDE_PATHS
                    }
                }
            }
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: "asset/resource",
          generator: {
            filename: (pathData) => {
              const filepath = pathData.module.resource;
              // Updated regex for new folder structure
              const themeMatch = filepath.match(/[\\/]themes[\\/]([^\\/]+)/);
              const themeName = themeMatch ? themeMatch[1] : "common";
              return `${themeName}/img/[name][ext]`;
            },
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: isProduction ? "[name].min.css" : "[name].css",
      }),
      new CopyWebpackPlugin({
        patterns: copyPatterns
      }),
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(packageJson.version),
      }),
      new webpack.BannerPlugin({
        banner: `HashtagCms Admin UI Kit v${packageJson.version}\nCopyright (c) ${new Date().getFullYear()} Marghoob Suleman\nLink: https://hashtagcms.org\nLicensed under MIT`,
        entryOnly: true,
      }),
    ],
    resolve: {
      extensions: [".js", ".vue", ".json", ".scss"],
      alias: ALIASES,
    },
    devtool: isProduction ? false : "source-map",
  };
};
