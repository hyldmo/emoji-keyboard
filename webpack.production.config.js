'use strict';

const CONFIG = require('./webpack.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = Object.assign(CONFIG, {
    devtool: 'source-map',

    module: {
        rules: [
			...CONFIG.module.rules,
            {
                test: /\.css$/,
                exclude: ['node_modules'],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: {
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							sourceMap: true,
						}
					},
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        ...CONFIG.plugins
	]
});