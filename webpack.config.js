const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

// Define specific aliases for monorepo packages
const ALIASES = {
    vue: 'vue/dist/vue.esm-bundler.js',
    '@hashtagcms/helpers': path.resolve(__dirname, 'packages/helpers/src'),
    '@hashtagcms/styles': path.resolve(__dirname, 'packages/styles'),
    '@hashtagcms/components': path.resolve(__dirname, 'packages/components/src')
};

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: argv.mode || 'development',
        entry: {
            hashtagcms: './packages/components/src/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].min.js' : '[name].js',
            library: {
                name: 'HashtagCMS',
                type: 'umd',
                export: 'default'
            },
            globalObject: 'this',
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]'
                    }
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].min.css' : '[name].css',
            }),
            new webpack.BannerPlugin({
                banner: `HashtagCMS JS Kit\nCopyright (c) ${new Date().getFullYear()} Marghoob Suleman\nLink: https://hashtagcms.org\nLicensed under MIT`,
                entryOnly: true
            })
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json', '.scss'],
            alias: ALIASES
        },
        devtool: isProduction ? false : 'source-map'
    };
};

