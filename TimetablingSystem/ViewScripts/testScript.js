$(document).ready(function () {

   

});
function defaultFont(element) {
    var el = document.getElementById(element);
    el.style.fontSize = 12 + 'px';

}

function changeFontSize(element, step) {
    var el = document.getElementById(element);
    var fontSize = parseInt(el.style.fontSize, 10);
    if (fontSize >= 10 && fontSize <= 24) {
        step = parseInt(step, 10);
        var curFont = parseInt(el.style.fontSize, 10);
        el.style.fontSize = (curFont + step) + 'px';
    }
    else if (fontSize <= 10 && step == 2) {
        step = parseInt(step, 10);
        var curFont = parseInt(el.style.fontSize, 10);
        el.style.fontSize = (curFont + step) + 'px';
    }
    else if (fontSize >= 22 && step == -2) {
        step = parseInt(step, 10);
        var curFont = parseInt(el.style.fontSize, 10);
        el.style.fontSize = (curFont + step) + 'px';
    }
}