$.fn.navigation = function() {
	return this.each(
		function() {
			var smallScreen = $('.small-screen');
			if(smallScreen.length > 0){
				$(this)
					.children('a')
					.on(
						'click',
						function(event) {
							event.preventDefault();
							$(this).next().toggleClass('active');
						}
					);

					$(this)
						.find('ul')
						.find('a')
						.on('click', function(event) {
							event.preventDefault();
							$(this).parents('ul').find('ul').removeClass('active');
							$(this).next('ul').toggleClass('active');
						});
			}
		}
	);
};