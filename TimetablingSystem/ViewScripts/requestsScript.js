$(document).ready(function () {

    requestsSet = getRequests();

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