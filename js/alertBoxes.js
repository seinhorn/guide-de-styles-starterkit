// Pattern boites d'alerte (Alert Boxes)
(function($){

	$.fn.alertBoxes = function() {

		return this.each(function(){
			$(this).append('<span class="close" title="fermer">x</span>');
			$(".close").click(function(e) {
				e.preventDefault();
				$(this).closest(".alert-box").slideUp();
			});
		});

	};

})(jQuery);