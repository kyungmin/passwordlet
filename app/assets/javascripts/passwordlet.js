window.Passwordlet = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Passwordlet.domains = new Passwordlet.Collections.Domains();

    Passwordlet.domains.fetch({
      success: function () {
        new Passwordlet.Routers.AppRouter({
          collection: Passwordlet.domains
        });
        Backbone.history.start();        
      }
    });
  }
};

$(document).ready(function(){
  Passwordlet.initialize();
});
