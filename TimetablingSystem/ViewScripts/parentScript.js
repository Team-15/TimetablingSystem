﻿$(document).ready(function () {

    /* Handels on-click of menu buttons - block coding */
    $('#MenuLinks li a').click(function () {

        /* Getting the linked page */
        var toLoad = $(this).attr('href');

        /* Hiding content and calling loadContent function - creates animation*/
        $('#ContentDiv').hide('slow', loadContent);

        /* Injects content to ContentDiv div tag */
        function loadContent() {
            $('#ContentDiv').load(toLoad, '', showNewContent);
        }

        /* Shows content div */
        function showNewContent() {
            $('#ContentDiv').show('normal');
        }

        /* In order to stop the browser actually navigating to the page, false is returned */
        return false;

    });

    /*
    var x = [true, false, true, false, true, true, true, true, true, false, false, false];
    var y = "010101010100001111111";

    alert(weeksEncoder(x));
    alert(weeksDecoder(y));
    alert(weeksReadableFormat(x));
    */
});