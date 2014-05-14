var department = "";

var departmentName = "";


var roundID = "";

var roundNumber = 1;

var roundStart = null;

var roundEnd = null;

var liveSemesterID = "";

var liveSemesterNumber = 1;

var liveYear = 0;

var numberOfWeeks = null;


var adHocRoundID = "";

var adHocStart = null;

var adHocEnd = null;

var adHocSemesterID = "";

var adHocSemesterNumber = 1;

var adHocYear = 0;

var adHocNumberOfWeeks = 1;


var departmentModules = [];

var allDepartmentModules = [];


var facilitiesArray = [];

var buildingsWithRooms = [];


//********Temporary Stores for Edit and Duplicate Functionality*****************

var duplicateRequestFlag = false;

var editRequestFlag = false;

var editAdHocFlag = false;

var temporaryRequestStore = null;

// *****************************************************************************

//******Temporary Flag and Store for Room Availability Functionality************

var roomAvailabilityFlag = true;

var roomAvailabilityData = {

    day: 1,
    start: 2,
    weeks: [],
    adhoc: false,
    roomCode: "J.0.01"

};

// *****************************************************************************


function loadInstaceData() {

    loadInstance();
    loadFacilitiesAndBuildingsWithRooms();
    loadModules();

}



function loadFacilitiesAndBuildingsWithRooms() {
    
    $.ajax({
        url: "api/BuilRoomFac/GetAllFacilities",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {
            facilitiesArray = setupFacilities(results);
        }
    });

    $.ajax({
        url: "api/BuilRoomFac/GetBuildingsWithRooms",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
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
            room.type = roomsData[rCounter].roomType;
            room.capacity = roomsData[rCounter].capacity;

            var facilitiesData = roomsData[rCounter].facilities;
            
            for (var fCounter = 0; fCounter < facilitiesData.length; fCounter++) room.facilities.push(facilitiesData[fCounter].id);

            building.rooms.push(room);

        }
        
        bwrArray.push(building);

    }

    return bwrArray;

}



function loadInstance() {

    $.ajax({
        url: "api/deptmod/GetAuthorisedDepartment",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {
            department = results.code;
            departmentName = results.name;
        }
    });



    $.ajax({
        url: "api/SemRou/GetLiveRound",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {
            
            roundID = results.id;

            roundNumber = results.roundNo;

            roundStart = dbDateTimeConverter(results.startTime);

            roundEnd = dbDateTimeConverter(results.endTime);

        }
    });

    $.ajax({
        url: "api/SemRou/GetLiveSemester",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {

            liveSemesterID = results.id;

            liveSemesterNumber = results.semesterNumber;

            liveYear = results.year;

            numberOfWeeks = results.numberOfWeeks;

        }
    });
    


    $.ajax({
        url: "api/SemRou/GetAdHocRound",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {

            adHocRoundID = results.id;

            adHocStart = dbDateTimeConverter(results.startTime);

            adHocEnd = dbDateTimeConverter(results.endTime);

        }
    });

    $.ajax({
        url: "api/SemRou/GetAdHocSemester",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {

            adHocSemesterID = results.id;

            adHocSemesterNumber = results.semesterNumber;

            adHocYear = results.year;

            adHocNumberOfWeeks = results.numberOfWeeks;

        }
    });

}

function loadModules() {

    $.ajax({
        url: "api/deptmod/GetActiveModules",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
        success: function (results) {
            departmentModules = setupModules(results);
        }
    });

    $.ajax({
        url: "api/deptmod/GetDepartmentModules",
        type: "GET",
        datatype: "JSON",
        data: {},
        async: false,
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



function getCurrentRoundPercentage() {
    
    var currentDate = new Date();

    var percentage = (currentDate.getTime() - roundStart.getTime()) / (roundEnd.getTime() - roundStart.getTime());

    percentage *= 100;

    return percentage;

    
}

function getDaysLeftInRound() {

    var currentDate = new Date();

    var daysMilliseconds = roundEnd.getTime() - currentDate.getTime();

    var days = daysMilliseconds / (1000 * 60 * 60 * 24)

    days = Math.floor(days);

    return days;

}