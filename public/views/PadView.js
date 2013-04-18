var PadView = Backbone.View.extend({

	tagName: "div",
	className: "pad",
    events: {
        "click": "clicked"
    },
	initialize: function(){
        _.bindAll(this,"render","clicked");
		this.render();
	},

	render: function(){
		// this.$el.html("")
	},

    clicked: function(){
        var self = this;
        this.$el.addClass("active");
        setTimeout(function () {
            self.$el.removeClass("active");
        }, 100);

        //play
        this.model.play();
    }

});