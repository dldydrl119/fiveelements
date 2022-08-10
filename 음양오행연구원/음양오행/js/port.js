(function($){

	/* Preloader */
	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(300).fadeOut('slow');
	});

	$(document).ready(function() {

		/* Porfolio isotope and filter */
		var portfolioIsotope = $('.portfolio-container').isotope({
			itemSelector: '.portfolio-item',
			layoutMode: 'fitRows'
		});

		$('#portfolio-flters li').on( 'click', function() {
			$("#portfolio-flters li").removeClass('filter-active');
			$(this).addClass('filter-active');

			portfolioIsotope.isotope({ filter: $(this).data('filter') });
		});

		/* Smooth scroll / Scroll To Top */
		$('a[href*=#]').bind("click", function(e){
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});

		/* Navbar */
		$('.header').sticky({
			topSpacing: 0
		});

		$('body').scrollspy({
			target: '.navbar-custom',
			offset: 70
		})

		/* WOW Animation When You Scroll */
		wow = new WOW({
			mobile: false
		});
		wow.init();

	});

})(jQuery);