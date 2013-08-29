/**
 * Configuration des dependances qui ne sont pas des modules AMD.
 */
requirejs.config({
	paths: {
		'jquery': 'vendor/jquery/1.8.3/jquery'
		,'h5f': 'vendor/h5f/h5f.min'
		,'snippet': 'vendor/snippet/jquery.snippet.min'
		,'handlebars': 'vendor/handlebars/1.0.0/handlebars'
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
		, 'handlebars': {
			exports: 'Handlebars'
		}
	}
});

require(
	[
		'handlebars'
		,'snippet'
		,'alertBoxes'
		,'patternLoader'
		,'jquery'
		,'h5f'
		,'affichePanelPage'
		,'navigation'
		,'foundation'
		,'foundation.section'
	], function () { //mustache

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

		//$('nav[role="navigation"]').affichePanelPage().navigation();

		// Charte ou intro a voir
		$("#color-swatches").patternLoader({file:'patterns/charte/color-swatches.html', loadContext: '.page-color-swatches'});
		$("#fonts").patternLoader({file:'patterns/charte/fonts.html', loadContext: '.page-fonts'});
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

		var guiStructure = {
			panelPage: [
				{
					id: 'charte'
					,title: 'Charte'
					,hash: ''
					,patterns: [
						{
							id: 'color-swatches',
							title: 'Code couleur',
							hash: '',
							src: 'patterns/charte/color-swatches.html',
							loadContext: '.page-color-swatches'
						}
						,{
							id: 'fonts',
							title: 'Polices',
							hash: '',
							src: 'patterns/charte/fonts.html',
							loadContext: '.page-fonts'
						}
					]
				},
				{
					id: 'typography',
					title: 'Typography',
					hash: '',
					patterns: [
						{
							id: 'titletypo'
							,title:'Les titres'
							,hash: ''
							,OuvertureSousMenu: 'right'
							,patterns: [
								{id: 'h1',title: 'H1',hash: '',src: 'patterns/typography/h1.html',loadContext: '.page-h1'}
								,{id: 'h2',title: 'H2',hash: '',src: 'patterns/typography/h2.html',loadContext: '.page-h2'}
								,{id: 'h3',title: 'H3',hash: '',src: 'patterns/typography/h3.html',loadContext: '.page-h3'}
								,{id: 'h4',title: 'H4',hash: '',src: 'patterns/typography/h4.html',loadContext: '.page-h4'}
								,{id: 'h5',title: 'H5',hash: '',src: 'patterns/typography/h5.html',loadContext: '.page-h5'}
								,{id: 'h6',title: 'H6',hash: '',src: 'patterns/typography/h6.html',loadContext: '.page-h6'}
							]
						},
						{
							id: 'listestypo'
							,title: 'Les listes'
							,hash: ''
						},
						{
							id: 'citetypo'
							,title: 'Citation'
							,hash: ''
						},
						{
							id: 'tabletypo'
							,title: 'Tableaux'
							,hash: ''
						},
						{
							id: 'autretypo'
							,title: 'Autres balises'
							,hash: ''
						}
					]

				},
				{
					id: 'layout',
					title: 'Layout',
					hash: '',
					patterns: [
						{id: 'layout-simple',title: 'Layout simple',hash: '',src: '',loadContext: ''},
						{id: 'off-canvas',title: 'Off canvas', hash: '', src: '', loadContext: ''},
						{id: 'grid',title: 'Grille', hash: '', src: '', loadContext: ''},
						{id: 'grid-block',title: 'Bloc de Grille', hash: '', src: '', loadContext: ''},
						{id: 'panel', title: 'Panels', hash: '', src: '', loadContext: ''},
						{id: 'tabs', title: 'Tabs', hash: '', src: '', loadContext: ''}
					]
				},
				{
					id: 'ui',
					title: 'Interface utilisateur',
					hash: '',
					patterns: [
						{id: 'Navigation', title: '', hash: '', src: '', loadContext: ''},
						{id: 'Boutons', title: '', hash: '', src: '', loadContext: ''},
						{id: 'Tooltips', title: '', hash: '', src: '', loadContext: ''}
					]
				},
				{
					id: 'forms',
					title: 'Formulaires',
					hash: '',
					patterns: [{id: 'Alert box', title: '', hash: '', src: '', loadContext: ''}]
				},
				{
					id: 'fx',
					title: 'Effets',
					hash: '',
					patterns: [{id: 'Masque', title: '', hash: '', src: '', loadContext: ''}]
				}
			]
		};
		console.log(guiStructure);

		var tplNav = $('#tpl-nav').html();
		var output = Handlebars.compile(tplNav);

		$('nav[role="navigation"]').append(output(guiStructure)).affichePanelPage().navigation();

	}
);