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