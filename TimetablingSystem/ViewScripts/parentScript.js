$(document).ready(function () {

    /* Handels on-click of menu buttons - block coding */
    $('#menuLinks li a').click(function () {

        /* Getting the linked page */
        var toLoad = $(this).attr('href');

        /* Hiding content and calling loadContent function - creates animation*/
        $('#contentDiv').hide('slow', loadContent);

        /* Injects content to ContentDiv div tag */
        function loadContent() {
            $('#contentDiv').load(toLoad, '', showNewContent);
        }

        /* Shows content div */
        function showNewContent() {
            $('#contentDiv').show('normal');
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
    //getStuff();
    loadModules();

});

function getStuff() {
    
    $.ajax({
        url: "api/deptmod/GetActiveModules",
        type: "GET",
        datatype: "JSON",
        data: {},
        success: function (results) {
            alert(JSON.stringify(results));
        }
    });

}