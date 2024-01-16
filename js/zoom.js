var Prototype = {

  Version: '1.7',

  Browser: (function(){
    var ua = navigator.userAgent;
    var isOpera = Object.prototype.toString.call(window.opera) == '[object Opera]';
    return {
      IE:             !!window.attachEvent && !isOpera,
      Opera:          isOpera,
      WebKit:         ua.indexOf('AppleWebKit/') > -1,
      Gecko:          ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1,
      MobileSafari:   /Apple.*Mobile/.test(ua)
    }
  })(),

  BrowserFeatures: {
    XPath: !!document.evaluate,

    SelectorsAPI: !!document.querySelector,

    ElementExtensions: (function() {
      var constructor = window.Element || window.HTMLElement;
      return !!(constructor && constructor.prototype);
    })(),
    SpecificElementExtensions: (function() {
      if (typeof window.HTMLDivElement !== 'undefined')
        return true;

      var div = document.createElement('div'),
          form = document.createElement('form'),
          isSupported = false;

      if (div['__proto__'] && (div['__proto__'] !== form['__proto__'])) {
        isSupported = true;
      }

      div = form = null;

      return isSupported;
    })()
  },

  ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
  JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,

  emptyFunction: function() { },

  K: function(x) { return x }
};

var Zoom = {
    size : 1.0,
    
    exec : function (v) {
        var currentSize = this.size;
        if (v == 0) {
            currentSize = 1.0;
        } else {
            currentSize += v * (zoomRate / 100.0);
        }
        
        if (currentSize < (minRate / 100.0) || currentSize > (maxRate / 100.0)) {
            if (currentSize > maxRate / 100.0)
                alert("더이상 확대 할 수 없습니다.");
            else
                alert("더이상 축소 할 수 없습니다.");
            return false;
        } else {
            this.size = currentSize;
        }
        
        if (!Prototype.Browser.IE) {
            $('body').css('-webkit-transform','scale(' + this.size + ')');
            $('body').css('-moz-transform','scale(' + this.size + ')');
            $('body').css('-o-transform','scale(' + this.size + ')');
            
            $('body').css('-webkit-transform-origin', '50% 0%');
            $('body').css('-moz-transform-origin', '50% 0%');
            $('body').css('-o-transform-origin', '50% 0%');
        } else {
            $('body').css('zoom', (this.size * 100.0) + '%');
            $('body').css('-ms-transform','scale(' + this.size + ')');
            $('body').css('-ms-transform-origin', '50% 0%');
/*            
            var val = $('body')[0].filters;
            if (val) {
                val.item(0).M11 *= 1.5;
                val.item(0).M12 *= 1.5;
                val.item(0).M21 *= 1.5;
                val.item(0).M22 *= 1.5;
            }
*/
        }
        $('body').css('transform','scale(' + this.size + ')');
        $('body').css('transform-origin', '50% 0%');
    },
    
    load : function (){
        
        if (this.size < 0.8 || this.size > 3.0) {
            return;
        }
        
        if (!Prototype.Browser.IE) {
            $('body').css('-webkit-transform','scale(' + this.size + ')');
            $('body').css('-moz-transform','scale(' + this.size + ')');
            $('body').css('-o-transform','scale(' + this.size + ')');
            
            $('body').css('-webkit-transform-origin', '50% 0%');
            $('body').css('-moz-transform-origin', '50% 0%');
            $('body').css('-o-transform-origin', '50% 0%');
        } else {
            $('body').css('zoom', (this.size * 100) + '%');
            $('body').css('-ms-transform','scale(' + this.size + ')');
            $('body').css('-ms-transform-origin', '50% 0%');
/*            
            var val = $('body')[0].filters;
            if (val) {
                val.item(0).M11 = this.size;
                val.item(0).M12 = this.size;
                val.item(0).M21 = this.size;
                val.item(0).M22 = this.size;
            }
*/
        }
        $('body').css('transform','scale(' + this.size + ')');
        $('body').css('transform-origin', '50% 0%');
    }
    
};


/****************************************************************
Zoom In & Zoom Out Script
****************************************************************/
var zoomRate = 5;            // 확대/축소시 증감률
var maxRate = 140;            //최대확대률
var minRate = 100;            //최소축소률

function GetCookie(name){
    if (document.cookie != "") {
        zoomc = document.cookie.split("; ");
        for (var i=0; i < zoomc.length; i++) {
            zoomv = zoomc[i].split("=");
            if (zoomv[0] == name) {
                return  unescape(zoomv[1]);
            }
        }
    }else{
        return "";
    }
}

function SetCookie(name,value){
    document.cookie = name + "=" + escape (value)+";path=/;";
}

function GoZoom(contentid){
    if(GetCookie("zoomVal") != null && GetCookie("zoomVal") != ""){
        document.body.style.zoom = GetCookie("zoomVal");
        currZoom=GetCookie("zoomVal");
    }
    else{
        document.body.style.zoom = '100%';
        currZoom = '100%';
    }
}

//Zoom In & Zoom Out  all[contentid] -> document.body.style.zoom = 110%
function zoomInOut(contentid, how) {

    if(GetCookie("zoomVal") != null && GetCookie("zoomVal") != ""){
        document.body.style.zoom = GetCookie("zoomVal");
        currZoom=GetCookie("zoomVal");
    }
    else{
        document.body.style.zoom = '100%';
        currZoom = '100%';
    }
    if ((how == "in") && (parseInt(currZoom) >= maxRate)) {
       alert("더이상 확대 할 수 없습니다.");
        return;
    }
    if ((how == "out") && (parseInt(currZoom) <= minRate)) {
        alert("더이상 축소 할 수 없습니다.");
        return;
    }
    if (how == "in") {
        document.body.style.zoom = parseInt(document.body.style.zoom)+zoomRate+'%';
    }
    else {
        document.body.style.zoom = parseInt(document.body.style.zoom)-zoomRate+'%';
    }
    SetCookie("zoomVal",document.body.style.zoom);
}

//    +, - key event
document.onkeypress = getKey;

function getKey(keyStroke) {
    isNetscape=(document.layers);
    eventChooser = (isNetscape) ? keyStroke.which : event.keyCode;
    which = String.fromCharCode(eventChooser).toLowerCase();
    which2 = eventChooser;

    var el=event.srcElement;

    if ((el.tagName != "INPUT") && (el.tagName != "TEXTAREA"))        //input,textarea 안에서의 +.-값은 실행안되도록
    {
        if(which == "+" )
            zoomInOut('zoom', 'in');
        else if(which == "-" )
            zoomInOut('zoom', 'out');
    }
}
