$(document).ready(function () {

   

});
function defaultFont(element) {
    var el = document.getElementById(element);
    el.style.fontSize = 14 + 'px';

}

function changeFontSize(element, step) {
    var el = document.getElementById(element);
    var fontSize = parseInt(el.style.fontSize, 10);
    if (fontSize >= 10 && fontSize <= 16) {
        step = parseInt(step, 10);
        var curFont = parseInt(el.style.fontSize, 10);
        el.style.fontSize = (curFont + step) + 'px';
    }
    else if (fontSize <= 10 && step == 2) {
        step = parseInt(step, 10);
        var curFont = parseInt(el.style.fontSize, 10);
        el.style.fontSize = (curFont + step) + 'px';
    }
    else if (fontSize >= 16 && step == -2) {
        step = parseInt(step, 10);
        var curFont = parseInt(el.style.fontSize, 10);
        el.style.fontSize = (curFont + step) + 'px';
    }
}function negativar() {
    // the css we are going to inject
    var css = 'html {-webkit-filter: invert(100%);' +
        '-moz-filter: invert(100%);' +
        '-o-filter: invert(100%);' +
        '-ms-filter: invert(100%); ' +
        'filter: invert(100%); ' +
        'filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'invert\'><feColorMatrix in=\'SourceGraphic\' type=\'matrix\' values=\'-1 0 0 0 1 0 -1 0 0 1 0 0 -1 0 1 0 0 0 1 0\'/></filter></svg>#invert"); }'
    ,

    head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    style.setAttribute("id", "invertStyle");

    // a hack, so you can "invert back" clicking the bookmarklet again
    if (!window.counter) { window.counter = 1; } else {
        window.counter++;
        if (window.counter % 2 == 0) {

            var invStyle = document.getElementById("invertStyle");
            head.removeChild(invStyle);

        }
    };

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    //injecting the css to the head
    head.appendChild(style);
}