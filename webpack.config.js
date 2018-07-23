const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd());
const SRC_DIR = path.resolve(appDirectory, 'src');
const DIST_DIR = path.resolve(appDirectory, 'dist');

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CDN_URL = 'http://cdn.com/';

module.exports = {
	mode: 'production',

	resolve: {
		modules: [SRC_DIR],
		extensions: ['.js']
	},

	entry: {
		app: path.resolve(SRC_DIR, 'main.js'),
	},

	output: {
		path: DIST_DIR,
		filename: '[name].js',
		publicPath: `${CDN_URL}[hash]/`,
	},

	plugins: [
		new SpriteLoaderPlugin(),
		new ExtractTextPlugin('app.css'),
	],

	module: {
		rules: [
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					esModule: false,
					publicPath: `${CDN_URL}sprites/[hash]/`,
				}
			},
			{
				test: /(\.css)$/,
				include: SRC_DIR,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader',
				})
			},
		],
	},
};
