const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    const isProd = argv.mode === "production";

    return {
        mode: isProd ? "production" : "development",
        entry: "./src/react-app/src/index.tsx",
        output: {
            path: path.resolve(__dirname, "dist/react-app"),
            filename: isProd ? "assets/[name].[hash].js" : "assets/[name].js",
            publicPath: isProd ? "./" : "/",
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                '@': path.resolve(__dirname, 'src/react-app/src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [
                        isProd ? {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        } : "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: !isProd
                            }
                        }
                    ],
                },
                {
                    test: /\.module\.s[ac]ss$/i,
                    use: [
                        isProd ? {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        } : "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: !isProd,
                                modules: {
                                    localIdentName: isProd ? '[hash:base64]' : '[name]__[local]___[hash:base64:5]'
                                }
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: !isProd
                            }
                        }
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /\.module\.s[ac]ss$/i,
                    use: [
                        isProd ? {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '../'
                            }
                        } : "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: !isProd
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: !isProd
                            }
                        }
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'assets/images/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'assets/fonts/',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/react-app/public/index.html",
                filename: "index.html",
                inject: true,
            }),
            ...(isProd ? [
                new MiniCssExtractPlugin({
                    filename: "assets/[name].[hash].css",
                    chunkFilename: "assets/[id].[hash].css"
                })
            ] : [])
        ],
        devServer: {
            contentBase: path.join(__dirname, "src/react-app/public"),
            port: 3000,
            open: true,
            hot: true,
            historyApiFallback: true,
            compress: true,
            overlay: true,
            stats: 'minimal'
        },
        devtool: isProd ? "source-map" : "cheap-module-eval-source-map",
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
    };
};