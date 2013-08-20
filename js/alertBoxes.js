// Pattern boites d'alerte (Alert Boxes)
$.alertBoxes = function() {
	$(".alert-box").append('<span class="close" title="fermer">x</span>');
	$(".close").click(function(e) {
		e.preventDefault();
		$(this).closest(".alert-box").slideUp();
	});
};