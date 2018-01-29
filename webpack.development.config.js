'use strict';

const CONFIG = require('./webpack.config');
const webpack = require('webpack');

const port = process.env.PORT || 1337;

module.exports = Object.assign(CONFIG, {
    output: Object.assign(CONFIG.output, {
        publicPath: `http://localhost:${port}/`,
    }),

    devtool: 'eval-source-map',

    devServer: {
        historyApiFallback: true,
        port,
        hot: true,
        overlay: true
    },

    module: {
        rules: [
			...CONFIG.module.rules,
            {
                test: /\.css$/,
                exclude: ['node_modules'],
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
						}
					},
                ]
            }
        ]
    },

    plugins: [
        ...CONFIG.plugins,
        new webpack.HotModuleReplacementPlugin()
    ]
});