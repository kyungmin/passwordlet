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

  $("h1.title").click(function(){
    Backbone.history.navigate("", { trigger: true });
  });

  $(window).scroll(function() {
    if (inView(".how-it-works")) {
      if ($(".step-1").css("visibility") == "hidden") {
        $(".step-1").css("visibility", "visible").addClass('animated bounceIn');
        setTimeout(function() {
          $(".step-2").css("visibility", "visible").addClass('animated bounceIn');
          setTimeout(function() {
            $(".step-3").css("visibility", "visible").addClass('animated bounceIn');
          }, 200);
        }, 200);
      }
    }

    if (inView(".behind-the-scenes")) {

      if ($("#cookie").css("visibility") == "hidden") {
        $("#key").css({
          visibility: "visible"
          }).addClass('animated bounceIn');

        setTimeout(function() {
        $("#key").animate({
          left: "+=250px"
        }, 900);

          setTimeout(function(){
            $("#key").hide();
            $("#cookie").css({
              visibility: "visible"
              }).addClass('animated bounceIn');

            setTimeout(function(){
              $("#cookie").animate({
                right: "+=300px"
              }, 500);

              setTimeout(function(){
                $("#cookie").animate({
                  right: "-=300px"
                }, 500);

                setTimeout(function(){
                  $("#cookie").addClass('animated bounceOut');
                });
              }, 1000);
            }, 1000);
          }, 1100);
        });
      }
    }
  });

   if ($(window).height() > 500) {
      if ($(".step-1").is(":visible") == false) {
        setTimeout(function() {
          $(".step-1").css("visibility", "visible").addClass('animated bounceIn');
          setTimeout(function() {
            $(".step-2").css("visibility", "visible").addClass('animated bounceIn');
            setTimeout(function() {
              $(".step-3").css("visibility", "visible").addClass('animated bounceIn');
            }, 200);
          }, 200);
        }, 100);
      }
    }

});

function inView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}