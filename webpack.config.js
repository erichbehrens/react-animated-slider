const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('[name].css');

const sliderConfig = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
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
						presets: ['env'],
						plugins: [
							'transform-object-rest-spread',
							'transform-class-properties',
							'transform-react-jsx'
						]
					}
				}
			}
		]
	},
	externals: {
		'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
	}
};

const cssConfig = {
	entry: {
		horizontal: './src/css/horizontal.css',
		vertical: './src/css/vertical.css'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].css',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: extractCSS.extract(['css-loader', 'postcss-loader']),
			}
		],
	},
	plugins: [extractCSS],
	externals: {
		'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
	},
};

module.exports = [ sliderConfig, cssConfig ];