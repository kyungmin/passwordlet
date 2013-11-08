Passwordlet.Views.NewView = Backbone.View.extend({
  template: JST['domains/new'],

  initialize: function (options) {
    this.listenTo(this.model, "add change", this.render);
  },

  events: {
    "submit #domain_form": "submit"
  },

  render: function() {
    var renderedContent = this.template({
      domain: this.model
    });
    this.$el.html(renderedContent);

    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var attr = $(event.currentTarget).serializeJSON();
    this.model.set(attr);
    this.model.save(this.model, {
      success: function(data) {
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
});