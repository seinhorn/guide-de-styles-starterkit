/**
 * Configuration des dependances qui ne sont pas des modules AMD.
 */
require.config({
	paths: {
		'jquery': 'vendor/jquery/1.8.3/jquery',
		'h5f': 'vendor/h5f/h5f.min',
		'snippet': 'vendor/snippet/jquery.snippet.min'
	},
	shim: {
		'jquery': {
			exports: '$'
		},
		'snippet': {
			deps: ['jquery']
		},
		'patternLoader': {
			deps: ['jquery']
		}
	}
});

require(
	[
		'snippet',
		'patternLoader',
		'jquery',
		'h5f'
	], function () {

	var bodyViewportClasses = function() {

		var nav_display = $('#mdetect').css('display');
		if (nav_display === 'block') {
			$("body")
				.removeClass("big-screen")
				.addClass("small-screen");
		}
		if (nav_display === 'none') {
			$("body")
				.removeClass("small-screen")
				.addClass("big-screen");
		}
	}
	// add/remove classes everytime the window resize event fires
	$(window).resize(function(){
		bodyViewportClasses();
	});

	bodyViewportClasses();

	$.fn.affichePanelPage = function() {
		return this.each(
			function(){
				$(this)
					.find('a[data-panelpage]')
					.click(
						function(event){
							var loc = $(this).attr('href');
							//console.log(loc.substring(1,loc.length));
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
		);
	};

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

	$('nav[role="navigation"]').affichePanelPage().navigation();

	// Pattern boites d'alerte (Alert Boxes)
	$.alertBoxes = function() {
		$(".alert-box").append('<span class="close" title="fermer">x</span>');
		$(".close").click(function(e) {
			e.preventDefault();
			$(this).closest(".alert-box").slideUp();
		});
	};

	$("#color-swatches").patternLoader({file:'patterns/charte/color-swatches.html', loadContext: '.page-color-swatches'});
	$("#fonts").patternLoader({file:'patterns/charte/fonts.html', loadContext: '.page-fonts'});
	$("#typography").patternLoader({file:'patterns/charte/typography.html', loadContext: '.page-typography'});
	$("#grid").patternLoader({file:'patterns/layout/grid.html', loadContext: '.page-grid'});
	$("#grid-block").patternLoader({file:'patterns/layout/grid-block.html', loadContext: '.page-grid-block'});
	$("#panel").patternLoader({file:'patterns/layout/panel.html', loadContext: '.page-panel'});
	$("#off-canvas").patternLoader({file:'patterns/layout/off-canvas.html', loadContext: '.page-off-canvas'});
	$("#boutons").patternLoader({file:'patterns/ui/boutons.html', loadContext: '.page-boutons'});
	$("#tooltips").patternLoader({file:'patterns/ui/tooltips.html', loadContext: '.page-tooltips'});
	$("#nav").patternLoader({file:'patterns/ui/nav.html', loadContext: '.page-nav'});
	$("#form").patternLoader({file:'patterns/forms/forms.html', loadContext: '.page-form'});
	$("#alert-boxes").patternLoader(
		{
			file:'patterns/forms/alert-boxes.html',
			loadContext: '.page-alert-boxes'
		},
		function(){
			$.alertBoxes();
		}
	);
	$("#masques").patternLoader({file:'patterns/fx/masques.html', loadContext: '.masque'});

		$("pre.htmlCode").snippet("html",{style:"acid",transparent:true});

});