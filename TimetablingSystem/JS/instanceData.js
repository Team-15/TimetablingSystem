//var currentSessionID = "";


var department = "";


var roundID = "";

var roundNumber = 1;

var roundStart = null;

var roundEnd = null;

var liveSemesterID = "";

var liveSemester = 1;

var liveYear = 0;

var numberOfWeeks = null;


var adHocRoundID = "";

var adHocStart = null;

var adHocEnd = null;

var adHocSemesterID = "";

var adHocSemester = 1;

var adHocYear = 0;

var adHocNumberOfWeeks = 1;


var departmentModules = [];

var allDepartmentModules = [];

//Move to script file dealing with all bookings view
//var allModules = [];

var facilitiesArray = [];

var buildingsWithRooms = [];


//********Temporary Stores for Edit and Duplicate Functionality*****************

var duplicateRequestFlag = false;

var editRequestFlag = false;

var temporaryRequestStore = null;

// *****************************************************************************

function loadInstaceData() {

    loadFacilitiesAndBuildingsWithRooms();
    loadModules();

}



function loadFacilitiesAndBuildingsWithRooms() {
    
    $.ajax({
        url: "api/BuilRoomFac/GetAllFacilities",
        type: "GET",
        datatype: "JSON",
        data: {},
        success: function (results) {
            facilitiesArray = setupFacilities(results);
        }
    });

    $.ajax({
        url: "api/BuilRoomFac/GetBuildingsWithRooms",
        type: "GET",
        datatype: "JSON",
        data: {},
        success: function (results) {
            buildingsWithRooms = setupBuildingsWithRooms(results);
        }
    });

}

function setupFacilities(facilitiesData) {

    var fArray = [];

    for (var counter = 0; counter < facilitiesData.length; counter++) {

        var facility = new Facility();

        facility.id = facilitiesData[counter].id;
        facility.name = facilitiesData[counter].name;

        fArray.push(facility);

    }

    return fArray;

}

function setupBuildingsWithRooms(buildingsData) {

    var bwrArray = [];

    for (var bCounter = 0; bCounter < buildingsData.length; bCounter++) {
        
        var building = new Building();

        building.code = buildingsData[bCounter].code;
        building.name = buildingsData[bCounter].name;
        building.park = buildingsData[bCounter].park;
        
        var roomsData = buildingsData[bCounter].rooms;

        for (var rCounter = 0; rCounter < roomsData.length; rCounter++) {
            
            var room = new Room();

            room.code = roomsData[rCounter].code;
            room.type = roomsData[rCounter].type;
            room.capacity = roomsData[rCounter].capacity;

            var facilitiesData = roomsData[rCounter].facilities;
            
            for (var fCounter = 0; fCounter < facilitiesData.length; fCounter++) room.facilities.push(facilitiesData[fCounter].id);

            building.rooms.push(room);

        }
        
        bwrArray.push(building);

    }

    return bwrArray;

}



function loadModules() {

    $.ajax({
        url: "api/deptmod/GetActiveModules",
        type: "GET",
        datatype: "JSON",
        data: {},
        success: function (results) {
            departmentModules = setupModules(results);
        }
    });

    $.ajax({
        url: "api/deptmod/GetDepartmentModules",
        type: "GET",
        datatype: "JSON",
        data: {},
        success: function (results) {
            allDepartmentModules = setupModules(results);
        }
    });

}

function setupModules(modulesData) {

    var mArray = [];

    for (var counter = 0; counter < modulesData.length; counter++) {

        var module = new Module();

        module.code = modulesData[counter].code;
        module.title = modulesData[counter].title;
        module.deptCode = modulesData[counter].deptCode;
        module.active = modulesData[counter].active;

        mArray.push(module);

    }

    return mArray;

}



function loadSession() {

    /*
    currentSessionID = document.location.href.match(/PHPSESSID=[^;]+/);

    $.ajax({
        url: "PHP/loadSessionData.php?" + currentSessionID,
        type: "GET",
        datatype: "json",
        async: false,
        data: {},
        success: function (results) {
            sessionDataSetup(results);
        }
    });
    */
}



function sessionDataSetup(sessData) {

    /*

    sessionData = JSON.parse(sessData);

    department = sessionData.Department;

    if(sessionData.LiveSemester.length != 0) {

        liveSemesterID = sessionData.LiveSemester[0].id;

        liveSemester = sessionData.LiveSemester[0].semesterNumber;

        liveYear = sessionData.LiveSemester[0].year;

        numberOfWeeks = sessionData.LiveSemester[0].numberOfWeeks;


        roundID = sessionData.LiveRound[0].id;

        roundNumber = sessionData.LiveRound[0].roundNo;

        roundStart = datetimeStringConverter(sessionData.LiveRound[0].start);

        roundEnd = datetimeStringConverter(sessionData.LiveRound[0].end);

    }


    if(sessionData.AdHocSemester.length != 0) {

        adHocSemesterID = sessionData.AdHocSemester[0].id;

        adHocSemester = sessionData.AdHocSemester[0].semesterNumber;

        adHocYear = sessionData.AdHocSemester[0].year;

        adHocNumberOfWeeks = sessionData.AdHocSemester[0].numberOfWeeks;


        adHocRoundID = sessionData.AdHocRound[0].id;

        adHocStart = datetimeStringConverter(sessionData.AdHocRound[0].start);

        adHocEnd = datetimeStringConverter(sessionData.AdHocRound[0].end);

    }

    loadFacilities(sessionData.AllFacilities);

    */

}

function getCurrentRoundPercentage() {
    /*
    var currentDate = new Date();

    var percentage = (currentDate.getTime() - roundStart.getTime()) / (roundEnd.getTime() - roundStart.getTime());

    percentage *= 100;

    return percentage;

    */
}