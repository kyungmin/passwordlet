Passwordlet.Routers.AppRouter = Backbone.Router.extend({
  route: function (route, name, callback) {
    if (!_.isRegExp(route)) route = this._routeToRegExp(route);
    if (!callback) callback = this[name];
    
    var that = this;
    _.wrap(callback, function (cb) {
      if ($("#current-user-id").text() != "") {
        cb();
      } else {
        window.location.href = "/users/sign_in";
      }
    })();
    
    Backbone.history.route(route, _.bind(function(fragment) {
      var args = this._extractParameters(route, fragment);
      callback && callback.apply(this, args);
      this.trigger.apply(this, ['route:' + name].concat(args));
      Backbone.history.trigger('route', this, name, args);
    }, this));
    return this;
  },

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
    var that = this;
    that._fetchDomains(function(domains) {
      var indexView = new Passwordlet.Views.IndexView({
        collection: domains
      });
      that._swapView(indexView);        
    });
  },

  new: function() {
    var domain = new Passwordlet.Models.Domain();
    var newView = new Passwordlet.Views.NewView({
      collection: Passwordlet.domains,
      model: domain
    });
    this._swapView(newView);
  },

  edit: function(id) {
    var domain = Passwordlet.domains.get(id);    
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