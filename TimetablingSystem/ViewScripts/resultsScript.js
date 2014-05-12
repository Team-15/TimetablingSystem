$(document).ready(function () {

    //Button Modes
    editEnabled = true;
    duplicateEnabled = true;
    deleteEnabled = true;


    createStatusList(false);
    performResetAndSetup();
    
    unfilteredRequests = getResults();

    requestsSet = executeFilters();

    displayReloader();

    

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

function refreshLoad() {
    unfilteredRequests = getResults();
    requestsSet = executeFilters();
}