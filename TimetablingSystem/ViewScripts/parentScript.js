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

    /* Handels on-click of menu buttons - block coding */
    $('#menuLinks li a, #menuLinks li').click(function () {

        $('#menuLinks li a, #menuLinks li').removeClass("activatedBtn");

        $(this).addClass("activatedBtn");

        /* In order to stop the browser actually navigating to the page, false is returned */
        //return false;

    });

    loadInstaceData();
    generateUserText();
    loadProgressBarAndText();

});

function loadProgressBarAndText() {
    

    $("#progressbar").progressbar({

        max: 100,

        value: getCurrentRoundPercentage()

    });

    if ($("#progressbar").progressbar("value") < 50) $("#progressbar").addClass('beginning');
    else if ($("#progressbar").progressbar("value") < 80) $("#progressbar").addClass('middle');
    else $("#progressbar").addClass('end');

    $("#roundInfo").html("Current Round: " + roundNumber);
    $("#progressText").html(getDaysLeftInRound() + " days until Round ends");

}

function generateUserText() {
    
    var deptText = "";

    deptText += "You are Logged In as: &nbsp &nbsp ";

    deptText += department;

    deptText += "<br />";

    deptText += departmentName;

    document.getElementById("userText").innerHTML = deptText;

}