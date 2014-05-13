$(document).ready(function () {

    allModules = getAllModules();

});


function availabilityFilter(roomsList, selectedWeeks, currentFlag) {

    if ((roomsList.length == 0) || (roomsList === null)) return [];

    if ((selectedWeeks.length == 0) || (selectedWeeks === null)) return [];


    var bookedRequests = (currentFlag ? getBookings() : getAdHocBookings());

    if ((bookedRequests.length == 0) || (bookedRequests === null)) return [];



    var selectedWeeksIndexes = [];

    for (var swCounter = 0; swCounter < selectedWeeks.length; swCounter++) if (selectedWeeks[swCounter]) selectedWeeksIndexes.push(swCounter);


    var requestsWithWeeks = [];

    for (var brCounter = 0; brCounter < bookedRequests.length; brCounter++) {

        var currentBkdRequest = bookedRequests[brCounter];

        var existsFlag = false;

        for (var swiCounter = 0; swiCounter < selectedWeeksIndexes.length; swiCounter++) if (currentBkdRequest.weeks[selectedWeeksIndexes[swiCounter]]) existsFlag = true;

        if (existsFlag) requestsWithWeeks.push(currentBkdRequest);
        
    }



    var requestsWithRoomsAllocated = [];

    for (var rwwCounter = 0; rwwCounter < requestsWithWeeks.length; rwwCounter++) {

        currentWeekRequest = requestsWithWeeks[rwwCounter];

        var allocRooms = currentWeekRequest.allocatedRooms;
        
        var hasRoom = false;

        for (var arCounter = 0; arCounter < allocRooms.length; arCounter++) {

            for (var rlCounter = 0; rlCounter < roomsList.length; rlCounter++) {

                if (allocRooms[arCounter] === roomsList[rlCounter]) hasRoom = true;

            }

        }

        if (hasRoom) requestsWithRoomsAllocated.push(currentWeekRequest);

    }



    var bookedTimes = [];

    for (var rwraCounter = 0; rwraCounter < requestsWithRoomsAllocated.length; rwraCounter++) {

        var requestTime = requestsWithRoomsAllocated[rwraCounter];

        bookedTimes.push({
            day: requestTime.day,
            start: requestTime.startPeriod,
            end: requestTime.endPeriod
        });

    }
    
    return bookedTimes;

}



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