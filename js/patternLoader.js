/**
 * Module de chargement de pattern
 */
define(['jquery','handlebars'], function($,Handlebars){

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
			
			$.get(options.file, {}, function(data){
				
				var pattern = {
					example : $(data).filter(options.loadContext).html()
				};
				var template = $('#tpl-tab').html();
				console.log(template);


				//console.log(pattern.exemple);
				if (options.code) {
					var output = Handlebars.compile(template);
					var output2 = output(pattern);
					//console.log(pattern.example);


					$el.append(output2)
					//.find("pre.htmlCode")
					//.snippet(
					//	"html"
					//	//, {style:"acid",transparent:true}
					//)
					;
					//console.log(pattern);
				} else {
					$el.append(pattern.example);
					//console.log(pattern);
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
