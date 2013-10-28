/**
 * Configuration des dependances qui ne sont pas des modules AMD.
 */
requirejs.config({

	paths: {
		'jquery': 		'vendor/jquery/1.8.3/jquery'
		,'h5f': 		'vendor/h5f/h5f.min'
		,'snippet': 	'vendor/snippet/jquery.snippet.min'
		,'handlebars': 	'vendor/handlebars/1.0.0/handlebars'
	},
	shim: {
		'jquery': { exports: '$' }
		,'snippet': { deps: ['jquery'] }
		,'affichePanelPage': { deps: ['jquery'] }
		,'navigation': { deps: ['jquery'] }
		,'alertBoxes': { deps: ['jquery'] }
		, 'handlebars': {
			exports: 'Handlebars'
		}
	}
});

require(
	[
		'setting'
		,'handlebars'
		,'snippet'
		,'alertBoxes'
		,'patternLoader'
		,'jquery'
		,'h5f'
		,'affichePanelPage'
		,'navigation'
	],
	function (setting) {

		$(function(){
			// permet de savoir quel media queries est utilise dans les css
			// les classes sont ajoutes a la balise body
			var bodyViewportClasses = function() {

				var nav_display = $('#mdetect').css('display');
				if (nav_display === 'block') $("body").removeClass("big-screen").addClass("small-screen");
				if (nav_display === 'none') $("body").removeClass("small-screen").addClass("big-screen");
			};

			$(window).resize(function(){ bodyViewportClasses(); });

			bodyViewportClasses();

			// Construction du menu de navigation
			var tplNav = $('#tpl-nav').html();
			var output = Handlebars.compile(tplNav);

			var $navigation = $('nav[role="navigation"]');
			$navigation.append(output(setting));

			// Construction du corps de la page
			var $contener = $('section[role=main]');
			// On boucle sur l'objet de configuration
			$.each(setting.panelPage, function(i) {

				var self = this;

				$contener.append('<div class="panel-page" id="' + self.id + '"></div>');

				var $blocPattern = $contener.children('#' + self.id + '.panel-page');

				if ( i == 0 ) $blocPattern.addClass('default');

				$blocPattern.append('<h2><span>'+self.titlePage+'</span></h2>');

				if ( self.patterns.length > 0 ) {
					$.each(self.patterns, function(i){
						$blocPattern.append('<div class="block-section" id="' + this.id + '"></div>');

						$('#' + this.id).patternLoader(
							{
								file: this.src
								,loadContext: this.loadContext
								,code: this.code
							}
						);
					});

				}
			});

			$navigation.affichePanelPage().navigation();

		});

	}
);