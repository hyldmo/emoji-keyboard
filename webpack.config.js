'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

const packageJSON = require('./package.json');

module.exports = {
    entry: './src/index.tsx',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.webpack.js', '.ts', '.tsx', '.js', '.css']
    },

    module: {
        rules: [
			{
                test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				exclude: ['node_modules'],
            },
            {
                test: /\.svg$/,
                loaders: ['react-svg-loader']
            }
        ],
    },

    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({
            title: packageJSON.name
                .split('-')
                .map(name => name.charAt(0).toUpperCase() + name.slice(1))
                .join(' '),
            template: 'templates/index.ejs',
		}),
		new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.PACKAGE_NAME': JSON.stringify(packageJSON.name),
            'process.env.PACKAGE_VERSION': JSON.stringify(packageJSON.version),
            'process.env.REPO_URL': JSON.stringify(packageJSON.repository.url)
        }),
    ]
};