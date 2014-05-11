$(document).ready(function () {

    performResetAndSetup();

    unfilteredRequests = getHistory();

    requestsSet = executeFilters();

    displayReloader();

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