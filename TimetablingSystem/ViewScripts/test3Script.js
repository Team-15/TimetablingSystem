﻿$(document).ready(function () {
    
    
    requestsSet = [];
    //fArray = [];


    requestsSet = testRequestList();
    //fArray = testFacilities();

    //generateGraphicalDisplay();

    
    var jsonReq = setupAddRequest(requestsSet[0]);
    alert("jsonReq" + "\n" + JSON.stringify(jsonReq));

    addRequest(jsonReq);
    

});


function setupAddRequest(request) {

    var facilitiesData = [], roomAllocData = [], roomPrefData = [];

    for (var faCounter = 0; faCounter < facilitiesArray.length; faCounter++) {

        for (var fCounter = 0; fCounter < request.facilities.length; fCounter++) {

            if (facilitiesArray[faCounter].id == request.facilities[fCounter]) {

                facilitiesData.push({
                    id: facilitiesArray[faCounter].id,
                    name: facilitiesArray[faCounter].name
                });

            }

        }

    }

    for (var bCounter = 0; bCounter < buildingsWithRooms.length; bCounter++) {

        var currentBuilding = buildingsWithRooms[bCounter];

        for (var rCounter = 0; rCounter < currentBuilding.rooms.length; rCounter++) {

            var currentRoom = currentBuilding.rooms[rCounter];

            for (var rpCounter = 0; rpCounter < request.rooms.length; rpCounter++) {

                if (currentRoom.code == request.rooms[rpCounter]) {

                    roomPrefData.push({
                        code: currentRoom.code,
                        buildingCode: currentBuilding.code,
                        roomType: currentRoom.type,
                        capacity: currentRoom.capacity
                    });

                }

            }

            for (var raCounter = 0; raCounter < request.rooms.length; raCounter++) {

                if (currentRoom.code == request.allocatedRooms[raCounter]) {

                    roomAllocData.push({
                        code: currentRoom.code,
                        buildingCode: currentBuilding.code,
                        roomType: currentRoom.type,
                        capacity: currentRoom.capacity
                    });

                }

            }

        }

    }

    var jsonRequestData =
    {
        //id: 0,
        moduleCode: request.module.code,
        deptCode: request.module.deptCode,
        priority: request.priority,
        day: request.day,
        startPeriod: request.startPeriod,
        endPeriod: request.endPeriod,
        weeks: weeksEncoder(request.weeks),
        numberOfStudents: request.students,
        parkPreference: request.park,
        sessionType: request.sessionType,
        numberOfRooms: request.noOfRooms,
        otherRequirements: request.otherReqs,
        //roundID: request.round,
        status: request.status,
        traditional: request.traditional,
        facilities: facilitiesData,
        roomAlloc: roomAllocData,
        roomPref: roomPrefData
    }

    
    alert(JSON.stringify(jsonRequestData));

    return jsonRequestData;
    
}

function addRequest(jsonData) {

    alert(JSON.stringify(jsonData));

    $.ajax({
        type: "POST",
        datatype: "JSON",
        contentType: "application/json;charset=utf-8",
        accepts: {
            text: "application/json"
        },
        data: JSON.stringify(jsonData),
        async: false,
        success: function (results) {
            alert("Added Called");
            alert(results);
        },
        error: function (results) {
            alert(JSON.stringify(results));
        },
        url: "api/request/PostNewRequest",
        processData: false
    });

}


function testFacilities() {

    var facility1 = new Facility();
    facility1.id = "10100";
    facility1.name = "Whiteboard";

    var facility2 = new Facility();
    facility2.id = "10101";
    facility2.name = "Data Projector";

    var facility3 = new Facility();
    facility3.id = "10102";
    facility3.name = "OHP";

    return [facility1, facility2, facility3];

}

function testRequestList() {

    var testReq = new Request();
    var testReq2 = new Request();
    var testReq3 = new Request();
    var testReq4 = new Request();
    var testReq5 = new Request();

    var module1 = new Module();
    module1.code = "COA123";
    module1.deptCode = "CO";
    module1.title = "Server Side Programming";

    var module2 = new Module();
    module2.code = "COB290";
    module2.deptCode = "CO";
    module2.title = "Team Projects";

    testReq.round = roundID;

    testReq.id = "1234";
    testReq.module = module1;

    testReq.priority = true;

    testReq.day = 2;
    testReq.startPeriod = 2;
    testReq.endPeriod = 3;
    testReq.weeks = [true, true, true, true, true, true, true, true, true, true, true, true, false, false, false];

    testReq.students = 100;
    testReq.park = 2;
    testReq.traditional = true;
    testReq.sessionType = 0;
    testReq.noOfRooms = 1;
    testReq.rooms = ["J.0.01", "J.0.02"];

    testReq.status = 0;

    testReq.facilities = [1, 2];
    testReq.otherReqs = "test other reqs";

    testReq.allocatedRooms = ["J.0.02"];


    testReq2.department = department;

    testReq2.round = roundID;

    testReq2.id = "1235";
    testReq2.module = module2;

    testReq2.priority = false;

    testReq2.day = 3;
    testReq2.startPeriod = 4;
    testReq2.endPeriod = 6;
    testReq2.weeks = [true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false];

    testReq2.students = 105;
    testReq2.park = 0;
    testReq2.traditional = true;
    testReq2.sessionType = 2;
    testReq2.noOfRooms = 1;
    testReq2.rooms = ["N.0.01", "N.0.03"];

    testReq2.status = 1;

    testReq2.facilities = ["10102"];
    testReq2.otherReqs = "";

    testReq2.allocatedRooms = ["N.0.01"];



    testReq3.department = department;

    testReq3.round = roundID;

    testReq3.id = "1236";
    testReq3.module = module1;

    testReq3.priority = false;

    testReq3.day = 3;
    testReq3.startPeriod = 5;
    testReq3.endPeriod = 7;
    testReq3.weeks = [false, false, false, true, false, true, false, true, true, true, true, true, false, true, false, false];

    testReq3.students = 100;
    testReq3.park = 0;
    testReq3.traditional = true;
    testReq3.sessionType = 2;
    testReq3.noOfRooms = 1;
    testReq3.rooms = ["N.0.01", "N.0.03"];

    testReq3.status = 1;

    testReq3.facilities = [1, 2, 4, 8];
    testReq3.otherReqs = "Deaf Student: Sign Linguist Required";

    testReq3.allocatedRooms = ["N.0.02"];


    testReq3.department = department;

    testReq4.round = roundID;

    testReq4.id = "1237";
    testReq4.module = module2;

    testReq4.priority = false;

    testReq4.day = 2;
    testReq4.startPeriod = 3;
    testReq4.endPeriod = 7;
    testReq4.weeks = [false, false, false, true, false, true, false, true, true, true, true, true, false, true, false, false];

    testReq4.students = 50;
    testReq4.park = 0;
    testReq4.traditional = true;
    testReq4.sessionType = 2;
    testReq4.noOfRooms = 1;
    testReq4.rooms = ["N.0.01", "N.0.03"];

    testReq4.status = 1;

    testReq4.facilities = ["10102"];
    testReq4.otherReqs = "";

    testReq4.allocatedRooms = ["N.0.02"];

    testReq4.round = roundID;

    testReq5.id = "1238";
    testReq5.module = module1;

    testReq5.priority = false;

    testReq5.day = 2;
    testReq5.startPeriod = 2;
    testReq5.endPeriod = 4;
    testReq5.weeks = [false, false, false, true, false, true, false, true, true, true, true, true, false, true, false, false];

    testReq5.students = 100;
    testReq5.park = 0;
    testReq5.traditional = false;
    testReq5.sessionType = 2;
    testReq5.noOfRooms = 1;
    testReq5.rooms = ["N.0.01", "N.0.03"];

    testReq5.status = 1;

    testReq5.facilities = ["10102"];
    testReq5.otherReqs = "";

    testReq5.allocatedRooms = ["N.0.02"];


    return [testReq, testReq2, testReq3, testReq4, testReq5];

}