function translateJsonRequest(jsonRequests) {

    var requestArray = [];
    
    for (var jrCounter = 0; jrCounter < jsonRequests.length; jrCounter++) {

        var currentJsonRequest = jsonRequests[jrCounter];

        var request = new Request();
        
        request.id = currentJsonRequest.id;
        
        for (var mCounter = 0; mCounter < departmentModules.length; mCounter++) if (departmentModules[mCounter].code === currentJsonRequest.moduleCode) request.module = departmentModules[mCounter];

        request.priority = currentJsonRequest.priority;

        request.day = currentJsonRequest.day;
        request.startPeriod = currentJsonRequest.startPeriod;
        request.endPeriod = currentJsonRequest.endPeriod;

        request.weeks = weeksDecoder(currentJsonRequest.weeks);

        request.students = currentJsonRequest.numberOfStudents;
        request.park = currentJsonRequest.parkPreference;
        request.traditional = currentJsonRequest.traditional;
        request.sessionType = currentJsonRequest.sessionType;
        request.noOfRooms = currentJsonRequest.numberOfRooms;
        request.otherReqs = currentJsonRequest.otherRequirements;
        request.status = currentJsonRequest.status;
        request.round = currentJsonRequest.roundID;

        for (var fCounter = 0; fCounter < currentJsonRequest.facilities.length; fCounter++) request.facilities.push(currentJsonRequest.facilities[fCounter].id);

        for (var rpCounter = 0; rpCounter < currentJsonRequest.roomPref.length; rpCounter++) request.rooms.push(currentJsonRequest.roomPref[rpCounter].code);

        for (var raCounter = 0; raCounter < currentJsonRequest.roomAlloc.length; raCounter++) request.allocatedRooms.push(currentJsonRequest.roomAlloc[raCounter].code);

        requestArray.push(request);

    }

    return requestArray;

}

function setupDBRequestModel(request) {

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
        id: 0,
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
        status: request.status,
        traditional: request.traditional,
        facilities: facilitiesData,
        roomAlloc: roomAllocData,
        roomPref: roomPrefData
    }


    alert(JSON.stringify(jsonRequestData));

    return jsonRequestData;

}