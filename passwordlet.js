javascript:(function(e,a,g,h,f,c,b,d){if(!(f=e.jQuery)||g>f.fn.jquery||h(f)){c=a.createElement("script");c.type="text/javascript";c.src="https://ajax.googleapis.com/ajax/libs/jquery/"+g+"/jquery.min.js";c.onload=c.onreadystatechange=function(){if(!b&&(!(d=this.readyState)||d=="loaded"||d=="complete")){h((f=e.jQuery).noConflict(1),b=1);f(c).remove()}};a.documentElement.childNodes[0].appendChild(c)}})(window,document,"1.3.2",function($,L){
$.support.cors = true;
$.ajax({
  type: "GET",
  url: "http://localhost:3000/domains/login",
  data: { domain: location.hostname },
  success: function(data) {
    var cookies = JSON.parse(data);
    for(var cookie in cookies) {
          var cookieStr = "";
          cookieStr += cookies[cookie].name + "=" + cookies[cookie].value + "; ";
          cookieStr += "expires=" + cookies[cookie].expires + "; ";
          cookieStr += "domain=" + cookies[cookie].domain + "; ";
          cookieStr += "path=" + cookies[cookie].path + ";";
          document.cookie = cookieStr;
    }
    window.location.reload();
  }
});
});