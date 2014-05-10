$(document).ready(function () {

    requestsSet = getRequests();

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

function getRequests() {

    var requests = [];

    $.ajax({
        url: "api/request/GetRequests",
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