$(document).ready(function () {

    requestsSet = getHistory();

    document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'></div>";

    generateListDisplay();

    $("input[name=timeRadio]").change(function () {

        if ($(this).val() === "time")  toggleTimeValue(true);
        else toggleTimeValue(false);

    });

});

function getHistory() {

    var requests = [];

    $.ajax({
        url: "api/request/GetHistory",
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