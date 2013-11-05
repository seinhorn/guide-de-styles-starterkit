// Module de configuration
define([], function(){

	var structure = {
		panelPage : [
			{
				id: 		'charte'
				,title:		'Charte'
				,titlePage: 'Charte graphique'
				,hash: 		''
				,patterns: [
					{
						id: 			'color-swatches'
						,title: 		'Code couleur'
						,hash: 			''
						,src: 			'patterns/charte/color-swatches.html'
						,loadContext: 	'.page-color-swatches'
						,code: 			false
					}
					,{
						id: 			'fonts'
						,title: 		'Polices'
						,hash: 			''
						,src: 			'patterns/charte/fonts.html'
						,loadContext: 	'.page-fonts'
						,code: 			false
					}
				]
			}
			,{
				id: 		'pagetypography'
				,title:		'Typography'
				,titlePage:	'Typography'
				,hash: 		''
				,patterns:	[
					{
						id:				'typography'
						,title:			'Typography'
						,hash:			''
						,src: 			'patterns/charte/typography.html'
						,loadContext: 	'.page-typography'
						,code: 			true
					}
				]
			}
			,{
			 	id: 		'layout'
				,title: 	'Layout'
				,titlePage: 'Layout'
				,hash: 		''
				,patterns:	[
					{
						id: 			'grid'
						,title:			'Grille'
						,hash: 			''
						,src:			'patterns/layout/grid.html'
						,loadContext:	'.page-grid'
						,code:			true
					}//,
					//{id: 'layout-simple',title: 'Layout simple',hash: '',src: '',loadContext: ''},
					//{id: 'off-canvas',title: 'Off canvas', hash: '', src: 'patterns/layout/off-canvas.html', loadContext: '.page-off-canvas'},
					//{id: 'grid-block',title: 'Bloc de Grille',hash: '',src: 'patterns/layout/grid-block.html',loadContext: '.page-grid-block',code:true},
					//{id: 'panel',title: 'Panels',hash: '',src: 'patterns/layout/panel.html',loadContext: '.page-panel',code:true},
					//{id: 'tabs', title: 'Tabs', hash: '', src: '', loadContext: ''}
				]
			},{
				id: 		'ui'
				,title: 	'Interface utilisateur'
				,titlePage: 'Interface utilisateur'
				,hash: 		''
				,patterns:	[
					{
						id: 			'boutons'
						,title: 		'Boutons'
						,hash: 			''
						,src: 			'patterns/ui/boutons.html'
						,loadContext: 	'.page-boutons'
						,code:			true
					}
					//,{id: 'tooltips', title: 'Navigation', hash: '', src: 'patterns/ui/tooltips.html', loadContext: '.page-tooltips'}
					//,{id: 'nav', title: 'Tooltips', hash: '', src: 'patterns/ui/nav.html', loadContext: '.page-nav'}
				]
			}
			,{
				id: 		'pageforms'
				,title: 	'Formulaires'
				,titlePage: 'Les formulaires'
				,hash: 		''
				,patterns:	[
					{
						id: 			'form'
						,title: 		''
						,hash: 			''
						,src: 			'patterns/forms/forms.html'
						,loadContext: 	'.page-form'
						,code:			true
					}
					,{
						id: 			'alert-boxes'
						,title: 		'Alert Box'
						,hash: 			''
						,src: 			'patterns/forms/alert-boxes.html'
						,loadContext: 	'.page-alert-boxes'
						,code: 			true
						,calback: 		['$.alertBoxes()']
					}
				]
			}
			,{
				id: 		'fx'
				,title: 	'Effets'
				,titlePage: 'Effets'
				,hash: 		''
				,patterns:	[
					{
						id:				'masques'
						,title:			'Masque'
						,hash:			''
						,src:			'patterns/fx/masques.html'
						,loadContext:	'.masque'
						,code:			true
					}
				]
			}
		]
	};

	return structure;


});