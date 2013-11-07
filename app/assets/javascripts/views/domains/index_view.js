Passwordlet.Views.IndexView = Backbone.View.extend({
  template: JST['domains/index'],
  
  events: {
    "click .log-me-in": "login",
    "click .delete": "remove"
  },

  render: function() {
    var renderedContent = this.template({
      domains: this.collection
    });
    this.$el.html(renderedContent);

    return this;
  },

  remove: function(event) {
    var id = $(event.target).attr("data-id");
    var domain = this.collection.get(id);
    domain.destroy();
  },

  login: function(event) {
    event.preventDefault();

    var domainId = $(event.target).attr("data-id");
    var domain = this.collection.get(domainId);
    
    $.ajax({
      type: "GET",
      url: "/domains/"+ domainId + "/login",
      success: function(data) {
        console.log(window.location.href)
        for(var cookie in data) {
          var options = {
            domain: data[cookie].domain,
            path: data[cookie].path,
            expiresAt: new Date(data[cookie].expires),
            secure: true
          };
          $.cookies.set(data[cookie].name, data[cookie].value, options);
        }

      },
      error: function(model, response){
        console.log(response)
      }
    });
  }
});