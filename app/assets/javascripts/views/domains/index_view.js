Passwordlet.Views.IndexView = Backbone.View.extend({
  template: JST['domains/index'],
  
  events: {
    "click .log-me-in": "login"
  },

  render: function() {
    var renderedContent = this.template({
      domains: this.collection
    });
    this.$el.html(renderedContent);

    return this;
  },

  login: function(event) {
    event.preventDefault();

    var domainId = $(event.target).attr("data-id");
    var domain = this.collection.get(domainId);
    $.ajax({
      type: "GET",
      url: "/domains/"+ domainId + "/login",
      success: function(data) {
        for(var cookie in data) {
          var cookieStr = "";
          cookieStr += data[cookie].name + "=" + data[cookie].value + "; ";
          cookieStr += "expires=" + data[cookie].expires + "; ";
          cookieStr += "path=" + data[cookie].path + ";";
          document.cookie = cookieStr;
        }
        window.location.href = domain.get("url");
      },
      error: function(model, response){
        
      }
    });
  }
});