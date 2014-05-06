$(document).ready(function () {

    requestsSet = [];

    document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'>List View Goes Here</div>";

    generateGraphicalDisplay();

    $("input[name=displayRadio]").change(function () {

        if ($(this).val() === "list") {
            document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'>List View Goes Here</div>";

        }
        else {
            document.getElementById("displaysContainer").innerHTML = "<div id='graphicalContainer'></div>";
            generateGraphicalDisplay();
        }

    });

    $("input[name=timeRadio]").change(function () {

        if ($(this).val() === "time") toggleTimeHeader(true);
        else toggleTimeHeader(false);

    });

});

function getResults() {

    var requests = [];

    $.ajax({
        url: "api/request/GetResults",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {
            requests = translateJsonRequest(results);
        }
    });

    return requests;

}