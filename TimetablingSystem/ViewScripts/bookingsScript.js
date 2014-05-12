$(document).ready(function () {

    //Button Modes
    editEnabled = false;
    duplicateEnabled = false;
    deleteEnabled = false;


    //Bookings View Flags
    currentViewFlag = true;
    departmentFlag = "allDepartments";
    

    allModules = getAllModules();

    performResetAndSetup();

    unfilteredRequests = getBookings();

    requestsSet = executeFilters();

    displayReloader();

    $("#selectmod").prop("disabled", true);

    $("input[name=requestTypeRadio]").change(function () {

        if ($(this).val() == "current") currentViewFlag = true;
        else currentViewFlag = false;

        typeRequestLoader();

        requestsSet = executeFilters();

        displayReloader();

    });

    $("input[name=departmentRadio]").change(function () {

        //Btn Flag Reset
        editEnabled = false;
        duplicateEnabled = false;
        deleteEnabled = false;


        typeRequestLoader();


        if ($(this).val() == "myDepartments") {

            unfilteredRequests = departmenalFilter(true);

            $("#selectmod").prop("disabled", false);

            editEnabled = true;
            duplicateEnabled = true;
            deleteEnabled = true;


        }
        else if ($(this).val() == "otherDepartments") {

            unfilteredRequests = departmenalFilter(false);

            $("#selectmod").val("All");
            $("#selectmod").prop("disabled", true);
        }
        else {

            $("#selectmod").val("All");
            $("#selectmod").prop("disabled", true);

        }

        requestsSet = executeFilters();

        displayReloader();

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


function refreshLoad() {
    typeRequestLoader();
    requestsSet = executeFilters();
}



function departmenalFilter(myDept) {

    var filteredRequests = [];

    if (myDept) {

        for (var ufrCounter = 0; ufrCounter < unfilteredRequests.length; ufrCounter++) {

            if (unfilteredRequests[ufrCounter].module.deptCode === department) filteredRequests.push(unfilteredRequests[ufrCounter]);

        }

    }
    else {

        for (var ufrCounter = 0; ufrCounter < unfilteredRequests.length; ufrCounter++) {

            if (unfilteredRequests[ufrCounter].module.deptCode !== department) filteredRequests.push(unfilteredRequests[ufrCounter]);

        }

    }

    return filteredRequests;

}

function typeRequestLoader() {
    
    if (currentViewFlag) unfilteredRequests = getBookings();
    else unfilteredRequests = getAdHocBookings();

}

