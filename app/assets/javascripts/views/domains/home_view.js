Passwordlet.Views.HomeView = Backbone.View.extend({
  template: JST['domains/home'],

  render: function() {    
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  }
});