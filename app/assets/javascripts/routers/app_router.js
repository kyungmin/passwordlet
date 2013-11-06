Passwordlet.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  index: function() {
    var indexView = new Passwordlet.Views.IndexView({
      collection: Passwordlet.domains
    });
    this._swapView(indexView);
  },

  _swapView: function (newView) {
    if (this._prevView) {
      this._prevView.remove();
    }

    this._prevView = newView;
    newView.render();
    $(".content").html(newView.$el);
  }
});