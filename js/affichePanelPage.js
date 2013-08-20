$.fn.affichePanelPage = function() {
	return this.each(
		function(){
			$(this)
				.find('a[data-panelpage]')
				.click(function(event){
					var loc = $(this).attr('href');
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