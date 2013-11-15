window.Passwordlet = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Passwordlet.domains = new Passwordlet.Collections.Domains();

    new Passwordlet.Routers.AppRouter({
      collection: Passwordlet.domains
    });
    Backbone.history.start();
  }
};

var play = true;

$(document).ready(function(){
  Passwordlet.initialize();

  $("h1.title").click(function(){
    Backbone.history.navigate("", { trigger: true });
  });

  animate(".coachmark-icon", "tada");

  $(window).scroll(function() {
    if (inView(".how-it-works")) {
      if ($(".step-1").css("visibility") == "hidden") {
        animate(".step-1", "bounceIn");

        setTimeout(function() {
          animate(".step-2", "bounceIn");

          setTimeout(function() {
            animate(".step-3", "bounceIn");
          }, 200);
        }, 200);
      }
    }

    if (inView(".behind-the-scenes")) {
      if (play) {
        playBTS();
      }
    }
  });

  $("#replay").click(function(){
    resetAnimation();
    playBTS();
  });
});

function playBTS() {
  play = false;

  animate("#key", "bounceIn");
  animate(".one", "flipInX");

  setTimeout(function() {
    $("#key").animate({ marginLeft: "+=33%" }, 700);

    setTimeout(function(){
      exit("#key", "fadeOut");

      $("#key").css({ marginLeft: "40%" });
      animate("#cookie", "bounceIn");

      setTimeout(function(){
        exit(".one", "flipOutX");
        animate(".two", "flipInX");            
        $("#cookie").animate({ marginLeft: "-=33%" }, 500);

        setTimeout(function(){
          exit(".two", "flipOutX");
          animate(".three", "flipInX");
          $("#cookie").animate({ marginLeft: "+=33%" }, 500);

          setTimeout(function(){
            exit(".three", "flipOutX");
            exit("#cookie", "bounceOut");
            animate(".four", "flipInX");

            setTimeout(function() {
              exit(".four", "flipOutX");
              $("#replay").css("visibility", "visible");
            }, 1200);
          }, 1500);
        }, 1700);
      }, 1200);
    }, 1400);
  });
}

function animate(elem, className) {
  $(elem).css("visibility", "visible").addClass('animated ' + className);
}

function exit(elem, className) {
  $(elem).css("visibility", "hidden").addClass('animated ' + className);
}

function resetAnimation() {
  $("#key").css({ marginLeft: "7%" });
  $("#key, #cookie, .one, .two, .three, .four").removeClass("animated bounceIn bounceOut fadeOut flipInX flipOutX");
  $("#replay").css("visibility", "hidden");
}

function inView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();
  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
