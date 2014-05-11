$(document).ready(function () {

   

});

function changeFontSize(element, step) {
    step = parseInt(step, 10);
    var el = document.getElementById(element);
    var curFont = parseInt(el.style.fontSize, 10);
    el.style.fontSize = (curFont + step) + 'px';
}