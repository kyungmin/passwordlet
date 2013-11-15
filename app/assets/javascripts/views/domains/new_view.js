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

    var success = function () {
      Backbone.history.navigate("", { trigger: true });
    };

    var error = function (model, response) {
      $(".alert").text("response.responseText");
    };

    this.model.set(attr);
    if (this.model.isNew()){
      this.collection.create(this.model, {
        success: success,
        error: error
      });      
    } else {
      this.model.save({}, {
        success: success,
        error: error
      })
    }
  }
});