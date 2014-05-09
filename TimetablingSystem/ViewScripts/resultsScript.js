$(document).ready(function () {

    requestsSet = getResults();

    document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'></div>";

    generateListDisplay();

    $("input[name=displayRadio]").change(function () {

        if ($(this).val() === "list") {

            document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'></div>";
            generateListDisplay();

        }
        else {
            document.getElementById("displaysContainer").innerHTML = "<div id='graphicalContainer'></div>";
            generateGraphicalDisplay();
        }

    });

    $("input[name=timeRadio]").change(function () {

        if ($(this).val() === "time") {
            toggleTimeHeader(true);
            toggleTimeValue(true);
        }
        else {
            toggleTimeHeader(false);
            toggleTimeValue(false);
        }

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