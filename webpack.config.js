const path = require('path');
const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-mixins'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('postcss-hexrgba'),
	require('autoprefixer'),
];

module.exports = {
	entry: './app/assets/scripts/App.js',
	output: {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'app'),
	},
	devServer: {
		watchFiles: ['app/**/*.html'], //Added watch for HTML
		static: { directory: path.join(__dirname, 'app'), watch: false }, // added watch:false, when watch for HTML
		hot: true,
		port: 3000,
		//liveReload: false, - no browser update when html is changed
	},
	mode: 'development',
	//watch: true, - not needed anymore
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					{ loader: 'css-loader', options: { url: false } },
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: { plugins: postCSSPlugins },
						},
					},
				],
			},
		],
	},
};
