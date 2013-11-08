Passwordlet.Views.IndexView = Backbone.View.extend({
  template: JST['domains/index'],

  initialize: function (options) {
    this.listenTo(this.collection, "add remove reset", this.render);
  },
  
  events: {
    "click .delete": "delete"
  },

  render: function() {
    var renderedContent = this.template({
      domains: this.collection
    });
    this.$el.html(renderedContent);

    return this;
  },

  delete: function(event) {
    event.preventDefault();
    var id = $(event.target).attr("data-id");
    var domain = this.collection.get(id);
    domain.destroy();
  }

});