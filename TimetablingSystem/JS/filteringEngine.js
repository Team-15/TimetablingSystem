$(document).ready(function () {

    //List setups and Filter Generation
    moduleList = departmentModules;
    buildingList = buildingsWithRooms;
    dayList = daysArray;

    //Data and Array setup
    unfilteredRequests = [];

    modulesFlag = false;
    selectedModule = "";

    buildingsFlag = false;
    selectedBuilding = "";

    roomsFlag = false;
    selectedRoom = "";

    daysFlag = false;
    selectedDay = null;

    weeksFlag = false;
    selectedWeek = null;

    statusesFlag = false;
    selectedStatus = false;

    //Filtering by each view
    timeViewFlag = true;
    displayViewFlag = true;


});

function performResetAndSetup() {

    //Reset for each page
    modulesFlag = false;
    buildingsFlag = false;
    roomsFlag = false;
    daysFlag = false;
    weeksFlag = false;
    statusesFlag = false;


    createModList();
    createBuildingList();
    createDaysList();
    createWeekList();

    //Filtering Engine functions
    $("#selectmod").change(function () {

        selectedModule = this.value;
        modulesFlag = $("#selectmod").find(":selected").data("modulestate");

        requestsSet = executeFilters();

        displayReloader();

    });

    $("#selectbuilding").change(function () {

        selectedBuilding = this.value;
        buildingsFlag = $("#selectbuilding").find(":selected").data("buildingstate");


        createRoomList(selectedBuilding);


        if (!buildingsFlag) {

            $("#selectroom").val("All");
            $("#selectroom").prop("disabled", true);
            roomsFlag = false;

        }
        else $("#selectroom").prop("disabled", false);


        $('#selectroom').change();


        requestsSet = executeFilters();

        displayReloader();

        

        

    });

    $("#selectday").change(function () {

        selectedDay = this.value;
        daysFlag = $("#selectday").find(":selected").data("daystate");

        requestsSet = executeFilters();

        displayReloader();

    });

    $("#selectweek").change(function () {

        selectedWeek = this.value;
        weeksFlag = $("#selectweek").find(":selected").data("weekstate");

        requestsSet = executeFilters();

        displayReloader();

    });

    $("#selectstatus").change(function () {

        selectedStatus = this.value;
        statusesFlag = $("#selectstatus").find(":selected").data("statusstate");

        requestsSet = executeFilters();

        displayReloader();

    });


    //View functions
    $("input[name=displayRadio]").change(function () {

        if ($(this).val() === "list") {

            displayViewFlag = true;

            $("#selectday").prop("disabled", false);

        }
        else {

            displayViewFlag = false;
            
            $("#selectday").val("All");
            $("#selectday").prop("disabled", true);

        }
        
        $("#selectday").change();

        requestsSet = executeFilters();
        
        displayReloader();

    });

    $("input[name=timeRadio]").change(function () {

        if ($(this).val() === "time") timeViewFlag = true;
        else timeViewFlag = false;

        displayReloader();

    });

}

function displayReloader() {
    
    if (displayViewFlag) {

        document.getElementById("displaysContainer").innerHTML = "<div id='listContainer'></div>";
        generateListDisplay();

    }
    else {

        document.getElementById("displaysContainer").innerHTML = "<div id='graphicalContainer'></div>";
        generateGraphicalDisplay();
        setupHeaderScroll(false);

    }

    if (timeViewFlag) {
        toggleTimeHeader(true);
        toggleTimeValue(true);
    }
    else {
        toggleTimeHeader(false);
        toggleTimeValue(false);
    }

}

function executeFilters() {

    var filteringRequests = unfilteredRequests.slice(0);


    if (modulesFlag) filteringRequests = moduleFilter(filteringRequests);

    if (buildingsFlag) filteringRequests = buildingFilter(filteringRequests);

    if (roomsFlag) filteringRequests = roomFilter(filteringRequests);

    if (daysFlag) filteringRequests = dayFilter(filteringRequests);

    if (weeksFlag) filteringRequests = weekFilter(filteringRequests);

    if (statusesFlag) filteringRequests = statusFilter(filteringRequests);

    //alert("Filtered Requests Array have:");
    //alert(JSON.stringify(filteringRequests));

    //Return filtered array to be returned to list or graphical view generators
    return filteringRequests;

}


function moduleFilter(reqArray) {

    var filteredRequests = [];


    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {

        if (reqArray[reqCounter].module.code === selectedModule) {
            filteredRequests.push(reqArray[reqCounter]);
        }

    }

    return filteredRequests;

}

function buildingFilter(reqArray) {

    var filteredRequests = [];

    var roomsList = buildingList[selectedBuilding].rooms;

    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {

        var currentReq = reqArray[reqCounter];

        var notAdded = true;

        for (var frCounter = 0; frCounter < filteredRequests.length; frCounter++) if (filteredRequests[frCounter].id == currentReq.id) notAdded = false;


        for (var roomCounter = 0; roomCounter < roomsList.length; roomCounter++) {

            if ((currentReq.rooms.indexOf(roomsList[roomCounter].code) != -1) && (notAdded)) {

                filteredRequests.push(currentReq);

                notAdded = false;

            }

            if ((currentReq.allocatedRooms.indexOf(roomsList[roomCounter].code) != -1) && (notAdded)) {

                filteredRequests.push(currentReq);

                notAdded = false;

            }

        }

    }

    return filteredRequests;

}

function roomFilter(reqArray) {

    var filteredRequests = [];

    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {

        var currentReq = reqArray[reqCounter];

        var notAdded = true;

        for (var duplicateCounter = 0 ; duplicateCounter < filteredRequests.length; duplicateCounter++) if (filteredRequests[duplicateCounter].id === currentReq.id) notAdded = false;


        for (var roomCounter = 0; roomCounter < currentReq.rooms.length; roomCounter++) {

            if (notAdded) {

                if (currentReq.rooms[roomCounter] === selectedRoom) {

                    filteredRequests.push(currentReq);

                    notAdded = false;

                }

            }

        }


        for (var roomCounter1 = 0; roomCounter1 < currentReq.allocatedRooms.length; roomCounter1++) {

            if (notAdded) {

                if (currentReq.allocatedRooms[roomCounter1] === selectedRoom) {

                    filteredRequests.push(currentReq);

                    notAdded = false;

                }

            }

        }



    }


    return filteredRequests;

}

function dayFilter(reqArray) {

    var filteredRequests = [];

    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {

        if (reqArray[reqCounter].day === parseInt(selectedDay)) {
            filteredRequests.push(reqArray[reqCounter]);
        }
    }

    return filteredRequests;

}

function weekFilter(reqArray) {

    var filteredRequests = [];

    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {

        if (reqArray[reqCounter].weeks[selectedWeek - 1] == true) filteredRequests.push(reqArray[reqCounter]);

    }

    return filteredRequests;

}

function statusFilter(reqArray) {

    var filteredRequests = [];

    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {

        if (reqArray[reqCounter].status == selectedStatus) filteredRequests.push(reqArray[reqCounter]);

    }

    return filteredRequests;

}





function createModList() {
    var modlist = "";

    modlist += 'Modules:';
    modlist += '<select id="selectmod">'
    modlist += '<option data-modulestate=false value="All">' + "All" + '</option>';
    for (var i = 0; i < moduleList.length; i++) {
        modlist += '<option data-modulestate=true value="' + moduleList[i].code + '">' + moduleList[i].code + ": " + moduleList[i].title + '</option>';
    }
    modlist += '</select>';
    document.getElementById('modulelist').innerHTML = modlist;
}

function createBuildingList() {
    var building = "";
    var building1 = "";

    building += 'Building:';
    building += '<select id="selectbuilding">'
    building += '<option data-buildingstate=false value="All">' + "All" + '</option>';
    for (var i = 0; i < buildingList.length; i++) {
        building += '<option data-buildingstate=true value="' + i + '">' + buildingList[i].code + ": " + buildingList[i].name + '</option>';

    }

    building += '</select>';

    building1 += 'Rooms: ';
    building1 += '<select id="selectroom">'
    building1 += '<option value="All">' + "All" + '</option>';

    building1 += '</select>';

    document.getElementById('buildinglist').innerHTML = building;
    document.getElementById('roomslist').innerHTML = building1;

    $("#selectroom").val("All");
    $("#selectroom").prop("disabled", true);
    roomsFlag = false;

}

function createRoomList(index) {

    var rooms = "";

    rooms += 'Rooms: ';
    rooms += '<select id="selectroom">'
    rooms += '<option data-roomstate=false value="All">' + "All" + '</option>';

    if (index !== "All") {
        for (var j = 0; j < buildingList[parseInt(index)].rooms.length; j++) {
            rooms += '<option data-roomstate=true value="' + buildingList[index].rooms[j].code + '">' + buildingList[index].rooms[j].code + '</option>';
        }
    }

    rooms += '</select>';
    document.getElementById('roomslist').innerHTML = rooms;

    $('#selectroom').change(function () {

        roomsFlag = $("#selectroom").find(":selected").data("roomstate");
        selectedRoom = this.value;

        requestsSet = executeFilters();

        displayReloader();

    });

}

function createDaysList() {

    var daylist = "";

    daylist += 'Day: ';
    daylist += '<select id="selectday">'
    daylist += '<option data-daystate=false value="All">' + "All" + '</option>';
    for (var i = 0; i < dayList.length; i++) {
        daylist += '<option data-daystate=true value="' + i + '">' + dayList[i] + '</option>';
    }
    daylist += '</select>';
    document.getElementById('dayslist').innerHTML = daylist;

}

function createWeekList() {

    var weeklist = "";

    weeklist += 'Week: ';
    weeklist += '<select id="selectweek">'
    weeklist += '<option data-weekstate=false value="All">' + "All" + '</option>';
    for (var i = 1; i <= 15/*(numberOfWeeks)*/; i++) {
        weeklist += '<option data-weekstate=true value="' + i + '">' + i + '</option>';
    }
    weeklist += '</select>';
    document.getElementById('weeklist').innerHTML = weeklist;


}

function createStatusList(requestState) {

    var status = "";

    status += 'Status: ';
    status += '<select id="selectstatus">'
    status += '<option data-statusstate=false value="All">' + "All" + '</option>';

    if (requestState) {

        status += '<option data-statusstate=true value=null>' + "Unsubmitted" + '</option>';
        for (var i = 0; i < 1 ; i++) status += '<option data-statusstate=true value="' + i + '">' + statusArray[i] + '</option>';

    }
    else for (var i = 1; i < statusArray.length ; i++) status += '<option data-statusstate=true value="' + i + '">' + statusArray[i] + '</option>';

    status += '</select>';

    if (document.getElementById('statuslist') != null) document.getElementById('statuslist').innerHTML = status;

}

