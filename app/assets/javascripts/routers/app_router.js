Passwordlet.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "home",
    "domains": "index",
    "domains/new": "new",
    "domains/:id/edit": "edit"
  },

  home: function() {
    if ($("#current-user-id").text() == "") {
      var homeView = new Passwordlet.Views.HomeView();
      this._swapView(homeView);
    } else {
      var that = this;
      that._fetchDomains(function(domains) {
        var indexView = new Passwordlet.Views.IndexView({
          collection: domains
        });
        that._swapView(indexView);
      });
    }
  },

  index: function() {
    if ($("#current-user-id").text() == "") {
      window.location.href = "/users/sign_in";
    } else {
      var that = this;
      that._fetchDomains(function(domains) {
        var indexView = new Passwordlet.Views.IndexView({
          collection: domains
        });
        that._swapView(indexView);        
      });      
    }
  },

  new: function() {
    if ($("#current-user-id").text() == "") {
      window.location.href = "/users/sign_in";
    } else {
      var domain = new Passwordlet.Models.Domain();
      var newView = new Passwordlet.Views.NewView({
        collection: Passwordlet.domains,
        model: domain
      });
      this._swapView(newView);
    }
  },

  edit: function(id) {
    if ($("#current-user-id").text() == "") {
      window.location.href = "/users/sign_in";
    } else {
      this._signedIn();
      var domain = Passwordlet.domains.get(id);    
      var editView = new Passwordlet.Views.NewView({
        model: domain
      });
      this._swapView(editView);
    }
  },

  _swapView: function (newView) {
    if (this._prevView) {
      this._prevView.remove();
    }

    this._prevView = newView;
    newView.render();
    $(".content").html(newView.$el);
  },

  _fetchDomains: function (callback) {
    var domains = Passwordlet.domains;
    domains.fetch({
      success: function () {
        callback(domains);
      }
    });
  }

});