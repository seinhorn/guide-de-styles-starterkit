define(['setting','jquery','handlebars'], function(setting, $, Handlebars){

	function Portfolio(customOptions){

		this.options = {
			detectPattern: '#mdetect',
			cssSmallScreen: 'small-screen',
			cssBigScreen: 'big-screen'
		};

		if (customOptions) {
			$.extend(this.options, customOptions);
		}

	}

	Portfolio.prototype = {
		init: function(){
			//console.log('Ok ' + this.options.displayPattern);
			this.setBodyViewportClasses();
			this.createNavigation();
		},
		// permet de savoir quel media queries est utilise dans les css
		// les classes sont ajoutes a la balise body
		setBodyViewportClasses: function(){
			var nav_display = $(this.options.detectPattern).css('display');

			if (nav_display === 'block') $("body").removeClass(this.options.cssBigScreen).addClass(this.options.cssSmallScreen);
			if (nav_display === 'none') $("body").removeClass(this.options.cssSmallScreen).addClass(this.options.cssBigScreen);
		},
		createNavigation: function(){
			// Construction du menu de navigation
			var tplNav = $('#tpl-nav').html();
			var output = Handlebars.compile(tplNav);

			var $navigation = $('nav[role="navigation"]');
			$navigation.append(output(setting));
		},
		affichePanelPage: function(el){
			$(el)
				.find('a[data-panelpage]')
				.click(function(event){
					var loc = $(this).attr('href');
					event.preventDefault();
					$('.panel-page').hide();
					$('#'+$(this).attr('data-panelpage')).show();
					document.location.hash = loc.substring(1,loc.length);
				}
			);
			$(document).ready(function(){
				$('.panel-page').hide();
				$('.panel-page.default').show();
			});
		}
	};

	$.fn.affichePanelPage = function() {
		return this.each(function(){
				Portfolio.affichePanelPage();
			}
		);
	};

	return Portfolio;

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