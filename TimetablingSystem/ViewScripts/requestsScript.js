$(document).ready(function () {

    createStatusList(true);
    performResetAndSetup();

    unfilteredRequests = getRequests();

    requestsSet = executeFilters();

    displayReloader();

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

function refreshLoad() {
    unfilteredRequests = getRequests();
    requestsSet = executeFilters();
}