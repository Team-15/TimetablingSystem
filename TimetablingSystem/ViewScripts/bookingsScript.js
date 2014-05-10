$(document).ready(function () {

    allModules = getAllModules();

    listViewFlag = true;

    requestsSet = getBookings();

    document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'></div>";

    $("input[name=requestTypeRadio]").change(function () {

        if ($(this).val() == "current") requestsSet = getBookings();
        else requestsSet = getAdHocBookings();

        if (listViewFlag) generateListDisplay();
        else generateGraphicalDisplay();

    });

    generateListDisplay();

    $("input[name=displayRadio]").change(function () {

        if ($(this).val() === "list") {

            document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'></div>";
            generateListDisplay();

            listViewFlag = true;

        }
        else {

            document.getElementById("displaysContainer").innerHTML = "<div id='graphicalContainer'></div>";
            generateGraphicalDisplay();

            listViewFlag = false;
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

function getAllModules() {

    var mArray = [];

    $.ajax({
        url: "api/deptmod/GetAllModules",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {
            mArray = setupModules(results);
        }
    });

    return mArray;

}

function getBookings() {

    var requests = [];

    $.ajax({
        url: "api/request/GetBookings",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {
            requests = translateJsonRequestOtherDepartments(results, allModules);
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
            requests = translateJsonRequestOtherDepartments(results, allModules);
        }
    });

    return requests;

}
