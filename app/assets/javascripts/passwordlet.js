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

  $("#replay").click(function(){
    alert();
    playBTS();
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

      if ($("#key").css("visibility") == "hidden") {
        playBTS();
      }
    }
  });

});

function inView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function playBTS() {
  $("#replay").hide();

  $("#key").css({
    top: $(".passwordlet-icon").offset().top,
    visibility: "visible"
    }).addClass('animated bounceIn');

  $(".one").css("visibility", "visible").addClass('animated flipInX');

  setTimeout(function() {
    $("#key").animate({
      left: "+=250px"
    }, 900);

    setTimeout(function(){
      $("#key").hide();
      $("#cookie").css({
        top: $(".passwordlet-icon").offset().top,
        visibility: "visible"
        }).addClass('animated bounceIn');

        $(".one").hide();
        $(".two").css("visibility", "visible").addClass('animated flipInX');
            
      setTimeout(function(){
        $("#cookie").animate({
          right: "+=300px"
        }, 500);

        setTimeout(function(){
          $("#cookie").animate({
            right: "-=300px"
          }, 500);
          $(".two").hide();
          $(".three").css("visibility", "visible").addClass('animated flipInX');

          setTimeout(function(){
            $(".three").hide();
            $(".four").css("visibility", "visible").addClass('animated flipInX');
            $("#cookie").addClass('animated bounceOut');

            setTimeout(function() {
              $(".four").hide();
              $(".ion-refresh").css("visibility", "visible").fadeIn();
            });

          }, 1500);

        }, 1700);
      }, 1200);
    }, 1400);
  });
}