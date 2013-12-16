/**
 * Configuration des dependances qui ne sont pas des modules AMD.
 */
requirejs.config({

	baseUrl: './js',
	paths: {
		'jquery': 		'vendor/jquery/1.8.3/jquery',
		'jquery.ui.core' : 'vendor/jquery-ui/jquery.ui.core',
		'jquery.ui.widget' : 'vendor/jquery-ui/jquery.ui.widget',
		'jquery.ui.tabs': 		'vendor/jquery-ui/jquery.ui.tabs',
		'h5f': 		'vendor/h5f/h5f.min',
		'snippet': 	'vendor/snippet/jquery.snippet.min',
		'handlebars': 	'vendor/handlebars/1.0.0/handlebars'
	},
	shim: {
		'jquery': { exports: '$' },
		'snippet': { deps: ['jquery'] },
		'affichePanelPage': { deps: ['jquery'] },
		'navigation': { deps: ['jquery'] },
		'alertBoxes': { deps: ['jquery'] },
		'handlebars': {
			exports: 'Handlebars'
		},
		'jquery.ui.core': { deps: ['jquery'] },
		'jquery.ui.widget': { deps: ['jquery.ui.core'] },
		'jquery.ui.tabs': { deps: [
			'jquery',
			'jquery.ui.core',
			'jquery.ui.widget'
		]}
	}
});