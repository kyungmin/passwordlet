Passwordlet.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "domains/new": "new",
    "domains/:id/edit": "edit"
  },

  index: function() {
    var indexView = new Passwordlet.Views.IndexView({
      collection: Passwordlet.domains
    });
    this._swapView(indexView);
  },

  new: function() {
    var domain = new Passwordlet.Models.Domain();
    var newView = new Passwordlet.Views.NewView({
      model: domain
    });
    this._swapView(newView);
  },

  edit: function(id) {
    var domain = Passwordlet.domains.get(id);
    
    // if(!domain){
    //   domain = new Passwordlet.domains({ id: id });
    //   domain.collection = Passwordlet.domains;
    //   domain.fetch({
    //     success: function() {
    //       Passwordlet.domains.add(domain);
    //     }
    //   });
    // }

    var editView = new Passwordlet.Views.NewView({
      model: domain
    });
    this._swapView(editView);
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