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

				$el.append(page).find("pre.htmlCode").snippet("html", {style:"acid",transparent:true});

				if (typeof myCcallback === 'function') {
					myCcallback.call(this);
				}
			},"html");
		});
	};
});
