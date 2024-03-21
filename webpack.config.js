const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = ( env, argv ) => (
	{
		entry : {
			bundle: [
				path.resolve( __dirname, 'src', 'index.tsx' ),
				path.resolve( __dirname, 'src', 'index.scss' ),
			]
		},
		output : {
			path: path.resolve( __dirname, 'dist' ),
			filename: '[name].js',
		},
		devtool : 'eval-cheap-source-map',
		watchOptions : {
			ignored : '**/node_modules/',
		},
		resolve : {
			extensions: ['.ts', '.tsx', '.js', '.json', ]
		},
		externals : {
			jquery: 'jQuery'
		},
		module : {
			rules : 
			[
				{
					test : /\.js$/,
					exclude : /(node_modules)/,
					use : 
					{
						loader : 'babel-loader',
						options :
						{
						presets : ['@babel/preset-env']
						}
					}
				},
				{
					test : /\.(ts|tsx)$/,
					exclude: /node_modules/,
					use : [
						{
							loader : 'babel-loader',
							options :
							{
							presets : ['@babel/preset-env']
							}
						},
						{
							loader: 'ts-loader',
						}
					]
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: 
					[
						{
							loader: MiniCssExtractPlugin.loader
						}, 
						{
							loader: "css-loader",
						},
						{
							loader: "postcss-loader"
						},
						{
							loader: "sass-loader",
							options: 
							{
								implementation: require("sass")
							}
						}
					]
				}
			]
		},
		plugins : 
		[ 
			new MiniCssExtractPlugin( { filename : '[name].css' } )
		]
	}
);
