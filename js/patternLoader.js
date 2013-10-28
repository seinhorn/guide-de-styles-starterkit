/**
 * Module de chargement de pattern
 */
define(['jquery','handlebars','setting'], function($, Handlebars, setting){

	$.fn.patternLoader = function (opts, myCcallback) {
		// comment on valide que le type est objet
		var settings = {
			file: null
			, loadContext: null
			, context: null
			, code: false
		};

		var options = $.extend(settings,opts);

		return this.each(function(){

			var $el = $(this);
			var file = options.file;
			$.get(file, {}, function(data){
				
				// on recupere la partie du code de la page qui nous interesse
				var page  = $(data).filter(options.loadContext);
				console.log('Page => '+file +' : '+page);
				
				var exemple = setting.panelPage;
				if (setting.panelPage.patterns.code) {
					var codePattern = [];
					// on charge le template
					var template = $('#tpl-tab').html();
					var output = Handlebars.compile(template);

					$(page).find('.pattern').each(function(i) {
						codePattern[i] = $(this).html();
						console.log('codePattern['+i+'] => ' + codePattern[i]);
					});
				
						
					//var output2 = output(pattern);
				//var pattern = $(page).find('.pattern').html();
				//console.log($(page).find('.pattern').html());
					//$('section.pattern', page).each(function(index){
						//$(this).replaceWith(output($(this).html()));
						//console.log('Code['+index+'] ==> '+this);
					//});

					//$el.append(output2)
						//.find("pre.htmlCode").snippet("html", {style:"acid",transparent:true})
					//;
					//console.log(output2);
				} else {
					$el.append(page);
				}

				if (typeof myCcallback === 'function') {
					myCcallback.call(this);
				}
			},"html")
			/*.fail(function(data){
				console.log(data.status);
				console.log(data.statusText);
				var msg = "Impossible de charger le fichier" + data.status + " " + data.statusText;
				$('<div id="error"/>').insertAfter(this).html(msg);
			})*/
			;
		});
	};
});
