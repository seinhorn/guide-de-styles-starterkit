require(
	[
		'setting',
		'Portfolio',
		'collapsed',
		'jquery.ui.tabs',
		'patternLoader',
		'handlebars',
		'snippet',
		'alertBoxes',
		'jquery',
		'h5f'
	],
	function (setting, Portfolio) {

		$(function(){

			var guistyles = new Portfolio({
				detectPattern: '#mdetect'
			});

			guistyles.init();

			$(window).resize(function(){
				guistyles.setBodyViewportClasses();
			});

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
								if(self.patterns[i].callback != undefined){
									self.patterns[i].callback();
								}
								$('.tabs').tabs();
							}
						);

					});

				}
			});

			$.fn.navigation = function() {
				return this.each(
					function() {
						var smallScreen = $('.small-screen');
						if(smallScreen.length > 0){
							$(this)
								.children('a')
								.on(
								'click',
								function(event) {
									event.preventDefault();
									$(this).next().toggleClass('active');
								}
							);

							$(this)
								.find('ul')
								.find('a')
								.on('click', function(event) {
									event.preventDefault();
									$(this).parents('ul').find('ul').removeClass('active');
									$(this).next('ul').toggleClass('active');
								});
						}
					}
				);
			};

			$('[role="navigation"]').navigation();
		});

	}
);