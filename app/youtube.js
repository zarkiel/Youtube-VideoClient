var Youtube = {
	initialize: function(){
		this.searchForm = new searchFormView({el: $('#searchForm')});
		this.videoResults = new videoResultsView({el: $('#videoResults')});
		this.watchVideo = new watchVideoView({el: $('#watchVideo')});
		this.router = new Router();
		
		this.router.on('route:view', function(id){
			
			$.getJSON('http://gdata.youtube.com/feeds/api/videos/'+ id +'?alt=json', function(data){
				video = new Video(data.entry);
				Youtube.watchVideo.render({video: video});
				Youtube.getDownloadLinks(video);
				Youtube.watchVideo.$el.css('top', '10px');
				Youtube.watchVideo.$el.show()
			})
		});
		
		Backbone.history.start();
	},

	currentPage: 1,
	perPage: 10,
	
	search: function(query, page){
		Youtube.currentPage = page;
		offset = (Youtube.currentPage * Youtube.perPage - Youtube.perPage) + 1; 
		url = 'http://gdata.youtube.com/feeds/api/videos?max-results='+ Youtube.perPage+'&start-index='+ offset +'&alt=json&q=' + query;
		$.getJSON(url, function(data){
			Youtube.videoResults.render({videos: data.feed.entry});
		});
	},
	
	getDownloadLinks: function(video){
		xhr = $.getJSON('server/download.php?id=' + video.getID(), function(data){
			console.log(data)
			view = new DefaultView({el: $('#downloadLinks'), templateContainer: '#downloadLinksTemplate'});
			view.render({downloadLinks: data, title: video.getTitle()});
		});	
	}
}
