var PadsView = Backbone.View.extend({

	el: "#padsWrapper .pads",
	initialize: function(){
		this.render();
	},

	render: function(){
		var self = this;
		var d = false;
		this.collection.each(function(el, idx){
			if(idx%4===0){
				d = $('<div class="col"></div>');
				self.$el.append(d);
			}
			d.append(new PadView({model: el}).el);
		});
	}

});