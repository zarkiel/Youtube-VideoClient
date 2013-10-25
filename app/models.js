var Video = Backbone.Model.extend({
	initialize: function(data){
		this.data = data;
	},
	
	getTitle: function(){
		return this.data['title']['$t']
	},
	
	getID: function(){
		return _.last(this.data['id']['$t'].split("/"))
	},
	
	getImage: function(){
		return 'http://i1.ytimg.com/vi/'+ this.getID() +'/mqdefault.jpg';
	},
	
	getAuthor: function(){
		return this.data.author[0].name['$t'];
	},
	
	getDescription: function(){
		return this.data.content['$t'];
	},
	
	getPublishDate: function(){
		moment.lang('es');
		date = moment(this.data.published['$t']).fromNow();
		return date.charAt(0).toUpperCase() + date.slice(1);
	},
	
	getViews: function(){
		return this.data['yt$statistics'].viewCount;
	},

});
