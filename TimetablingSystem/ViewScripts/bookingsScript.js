$(document).ready(function () {

    listViewFlag = true;

    requestsSet = getBookings();

    document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'>List View Goes Here</div>";

    $("input[name=requestTypeRadio]").change(function () {

        if ($(this).val() == "current") requestsSet = getBookings();
        else requestsSet = getAdHocBookings();

        if (listViewFlag) alert("ListView");
        else generateGraphicalDisplay();

    });

    generateGraphicalDisplay();

    $("input[name=displayRadio]").change(function () {

        if ($(this).val() === "list") {

            document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'>List View Goes Here</div>";

            listViewFlag = true;

        }
        else {

            document.getElementById("displaysContainer").innerHTML = "<div id='graphicalContainer'></div>";
            generateGraphicalDisplay();

            listViewFlag = false;
        }

    });

    $("input[name=timeRadio]").change(function () {

        if ($(this).val() === "time") toggleTimeHeader(true);
        else toggleTimeHeader(false);

    });

});

function getBookings() {

    var requests = [];

    $.ajax({
        url: "api/request/GetBookings",
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

function getAdHocBookings() {

    var requests = [];

    $.ajax({
        url: "api/request/GetAdHocBookings",
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
