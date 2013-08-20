/**
 * Configuration des dependances qui ne sont pas des modules AMD.
 */
requirejs.config({
	paths: {
		'jquery': 'vendor/jquery/1.8.3/jquery'
		,'h5f': 'vendor/h5f/h5f.min'
		,'snippet': 'vendor/snippet/jquery.snippet.min'
		,'mustache': 'vendor/mustache/mustache'
		,'foundation': 'vendor/foundation/foundation'
		,'foundation.section': 'vendor/foundation/foundation.section'
	},
	shim: {
		'jquery': { exports: '$' }
		,'foundation': { deps: ['jquery'] }
		,'foundation.section': { deps: ['foundation'] }
		,'snippet': { deps: ['jquery'] }
		,'affichePanelPage': { deps: ['jquery'] }
		,'navigation': { deps: ['jquery'] }
		,'alertBoxes': { deps: ['jquery'] }
		//,'mustache': { 
		//	deps: ['jquery']
		//	,exports: 'mustache'
		//}
		//,'patternLoader': { deps: ['jquery','mustache'] }
	}
});

require(
	[
		'snippet'
		,'patternLoader'
		,'jquery'
		,'h5f'
		,'affichePanelPage'
		,'navigation'
		,'alertBoxes'
		,'mustache'
		,'foundation'
		,'foundation.section'
	], function () {

		// permet de savoir quel media queries est utilise dans les css
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

		$(window).resize(function(){
			bodyViewportClasses();
		});

		bodyViewportClasses();

		$('nav[role="navigation"]').affichePanelPage().navigation();

		// Charte ou intro a voir
		$("#color-swatches").patternLoader({file:'patterns/charte/color-swatches.html', loadContext: '.page-color-swatches'});
		$("#fonts").patternLoader({file:'patterns/charte/fonts.html', loadContext: '.page-fonts',code:true});
		// Typography
		$("#typography").patternLoader({file:'patterns/charte/typography.html', loadContext: '.page-typography',code:true});
		// Layout
		$("#grid").patternLoader({file:'patterns/layout/grid.html', loadContext: '.page-grid',code:true});
		$("#grid-block").patternLoader({file:'patterns/layout/grid-block.html', loadContext: '.page-grid-block',code:true});
		$("#panel").patternLoader({file:'patterns/layout/panel.html', loadContext: '.page-panel',code:true});
		// $("#off-canvas").patternLoader({file:'patterns/layout/off-canvas.html', loadContext: '.page-off-canvas'});
		$("#boutons").patternLoader({file:'patterns/ui/boutons.html', loadContext: '.page-boutons',code:true});
		// $("#tooltips").patternLoader({file:'patterns/ui/tooltips.html', loadContext: '.page-tooltips'});
		// $("#nav").patternLoader({file:'patterns/ui/nav.html', loadContext: '.page-nav'});
		// Formulaires
		$("#form").patternLoader({file:'patterns/forms/forms.html', loadContext: '.page-form',code:true});
		$("#alert-boxes").patternLoader(
			{
				file:'patterns/forms/alert-boxes.html',
				loadContext: '.page-alert-boxes',
				code:true
			},
			function(){
				$.alertBoxes();
			}
		);
		// Effets
		$("#masques").patternLoader({file:'patterns/fx/masques.html', loadContext: '.masque',code:true});

		$("pre.htmlCode").snippet("html",{style:"acid",transparent:true});

		$(document).foundation();

	}
);