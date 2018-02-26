void (function(doc, win) {
  var evt = "onorientationchange" in window ? "orientationchange" : "resize",
      fn = function() {
          var designWidth = 750, rem2px = 32;
          var d = window.document.createElement('div');
          d.style.width = '1rem';
          d.style.display = "none";
          var head = window.document.getElementsByTagName('head')[0];
          head.appendChild(d);
          var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
          document.documentElement.style.fontSize = 
            window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
      };
    win.addEventListener(evt, function(){
        setTimeout(function(){
            fn();
        }, 300);
    }, false);
    fn();
}(document, window));