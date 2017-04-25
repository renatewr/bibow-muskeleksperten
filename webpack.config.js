const path = require("path");

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [
            {
              test: /\.less$/,
              loaders: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                  loader: 'css-loader', //translates css into CommonJs                  
                },
                {
                  loader: 'less-loader', //compiles less into css
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: function () {
                      return [
                        require('autoprefixer')({ browsers: ['> 1%', 'IE >= 10'] })
                      ];
                    },
                  },
                },
              ],
              })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.svg$/,
                loaders: ['raw-loader']
            },
            {
                test: /\.png$/,
                loader: 'file-loader?name=[name].[hash].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'es2015'
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ExtractTextPlugin({
            filename: 'app.css'
        }),
        new StyleExtHtmlWebpackPlugin({
            file: 'app.css'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new OfflinePlugin({
            responseStrategy: 'network-first'
        })
    ],
    devServer: {
        contentBase: './src'
    }
};