/**
 * Module de chargement de patterns
 */
;(function($){
	$.fn.loadPattern = function (opts, myCcallback) {
		// comment on valide que le type est objet
		var settings = {
			file: null
			, loadContext: null
			, context: null
		};

		var options = $.extend(settings,opts);

		return this.each(function(){

			var masques = $(this).load(
				options.file+" "+options.loadContext,
				function(response, status, xhr){
					if (status == "error") {
						var msg = "Impossible de charger le fichier" + xhr.status + " " + xhr.statusText;
						$('<div id="error"/>').insertAfter(this).html(msg);
					} else {
						$(this).find("pre.htmlCode").snippet("html",{style:"acid",transparent:true});
						if (typeof myCcallback === 'function') {
							myCcallback.call(this);
						}
					}
				}
			);
		});

	};
})(jQuery);
