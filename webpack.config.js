const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const sliderConfig = {
	entry: {
		index: './src/index.js',
		horizontal: './src/css/horizontal.css',
		vertical: './src/css/vertical.css',
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /(node_modules|bower_components|build)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/proposal-class-properties',
							'@babel/proposal-object-rest-spread',
							'@babel/transform-react-jsx',
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
			},
		],
	},
	externals: {
		react: 'commonjs react', // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
	},
	plugins: [
		new IgnoreEmitPlugin(['horizontal.js', 'vertical.js']),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].css',
    }),
    new CopyPlugin([{ from: './src/index.d.ts', to: './index.d.ts' }])
	],
};

module.exports = [sliderConfig];
