const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/global/app.js', 'public/js')
	.js('resources/js/admin/app.js', 'public/js/admin')
	.webpackConfig({
		 module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules(?!\/foundation-sites)|bower_components/,
					use: [
						{
							loader: 'babel-loader',
							options: Config.babel()
						}
					]
				}
			]
		}
	})
	.sass('resources/sass/app.scss', 'public/css');
