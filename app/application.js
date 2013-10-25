$(function(){
	Youtube.initialize();
	
	$(window).scroll(function(){
		var wintop = $(window).scrollTop(), docheight = $(document).height(), winheight = $(window).height();
		var  scrolltrigger = 0.95;

		if  ((wintop/(docheight-winheight)) > scrolltrigger) {
			Youtube.search($('#searchQuery').val(), Youtube.currentPage + 1);
		}
	});
});
