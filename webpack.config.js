const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const packageJson = require("./package.json");

// Dynamic Theme Discovery
const themesDir = path.resolve(__dirname, "packages/themes");
const discoveredThemes = fs.readdirSync(themesDir).filter(f => 
    fs.statSync(path.join(themesDir, f)).isDirectory()
);

const THEME_ALIASES = {};
discoveredThemes.forEach(theme => {
    THEME_ALIASES[`@hashtagcms/theme/${theme}`] = path.resolve(themesDir, theme, 'src');
});

// Core package aliases
const ALIASES = {
  ...THEME_ALIASES,
  "@hashtagcms/helpers": path.resolve(__dirname, "packages/helpers/src"),
};

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode || "development",
    entry: {
      'admin-ui-kit': "./packages/themes/neo/src/components/index.js", // Main legacy entry
      'neo/admin-ui-kit': "./packages/themes/neo/src/components/index.js",
      'modern/admin-ui-kit': "./packages/themes/modern/src/components/index.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].min.js" : "[name].js",
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
                      content: [
                        "./packages/themes/neo/src/**/*.{vue,js,scss,blade.php}",
                        "./packages/themes/modern/src/**/*.{vue,js,scss,blade.php}"
                      ]
                    }),
                    require("autoprefixer")
                  ]
                }
              }
            },
            "sass-loader"
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext]",
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: isProduction ? "[name].min.css" : "[name].css",
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
