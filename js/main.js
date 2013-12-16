
require(
	[
		'setting',
		'jquery.ui.tabs',
		'handlebars',
		'snippet',
		'alertBoxes',
		'patternLoader',
		'jquery',
		'h5f',
		'affichePanelPage',
		'navigation'
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
								file: this.src,
								loadContext: this.loadContext,
								code: this.code
							},
							function(){
								$('.tabs').tabs();
							}
						);

					});

				}
			});

			$navigation.affichePanelPage().navigation();


		});

	}
);