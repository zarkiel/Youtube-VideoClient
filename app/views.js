var DefaultView = Backbone.View.extend({
	initialize: function(data){
		if(data.templateContainer){
			this.templateContainer = data.templateContainer;
		}
	},
	getTemplate: function(context){
		template = _.template($(this.templateContainer).html(), context);
		return template;
	},
	
	render: function(context){
		this.$el.html(this.getTemplate(context));
	},
});

var searchFormView = DefaultView.extend({
	templateContainer: '#searchFormTemplate',
	
	initialize: function(){
		this.render({query: ''});
		Youtube.search('', 1);
	},
	
	events: {
		'keydown #searchQuery': function(e){
			if(e.keyCode == 13){
				$('#videoResults').html('');
				Youtube.search(e.target.value, 1);
			}
		}
	}
		
});

var videoResultsView = DefaultView.extend({
	templateContainer: '#videoResultsTemplate',
	
	render: function(context){
		this.$el.append(this.getTemplate(context));
	}
});


var watchVideoView = DefaultView.extend({
	templateContainer: '#watchVideoTemplate',
	events: {
		'click .close': function(){
			this.$el.hide()
			this.$el.html('');
		}
	}
});
