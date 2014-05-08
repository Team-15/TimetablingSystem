$(document).ready(function () {

    

    //Data and Array setup
    requestArray = [];
    moduleList = [];
    buildingList = [];
    dayList = [];

    requestArray = testRequestList();
    moduleList = departmentModules;
    buildingList = buildingsWithRooms;
    dayList = daysArray;

    //List setups
    createModList();
    createBuildingList();
    createDaysList();
    createWeekList();
    createStatusList();
    createDepartmentList();
    createStageList();


    $("#selectmod").change(function () {
        selectedModule = this.value;
        alert(selectedModule);

        //Custom attribute uses to set flag true or false
        //Repeat for other elements
        //See your createModList and look for data-modulestate= attribute
        modulesFlag = $("#selectmod").find(":selected").data("modulestate");
        alert(modulesFlag);

        //Execute the filters at the end of every change.
        //Don't worry about the other filters, that's what the Flags handle
        executeFilters();

    });

    $("#selectbuilding").change(function () {
        selectedBuilding = this.value;
        alert(selectedBuilding);
        buildingsFlag = $("#selectbuilding").find(":selected").data("buildingstate");
        alert(buildingsFlag);
        
        if (buildingsFlag == false) {
            $("#selectroom").prop("disabled", true);
            roomsFlag = false;
        }
        else $("#selectroom").prop("disabled", false);


        createRoomList(selectedBuilding);
        executeFilters();

        $('#selectroom').change(function () {

            roomsFlag = $("#selectroom").find(":selected").data("roomstate");
            selectedRoom = this.value;

            executeFilters();

        });

    });


    $("#selectday").change(function () {
        selectedDay = this.value;
        alert(selectedDay);
        daysFlag = $("#selectday").find(":selected").data("daystate");
        alert(daysFlag);
        executeFilters();

    });

    $("#selectweek").change(function () {
        selectedWeek = this.value;
        alert(selectedWeek);
        weeksFlag = $("#selectweek").find(":selected").data("weekstate");
        alert(weeksFlag);
        executeFilters();

    });

    $("#selectstatus").change(function () {
        selectedStatus = this.value;
        alert(selectedStatus);
        statusesFlag = $("#selectstatus").find(":selected").data("statusstate");
        alert(statusesFlag);
        executeFilters();


    });

});

//Filter Flags

var modulesFlag = false; // List & Graphical
var selectedModule = "";

var buildingsFlag = false; //List and Graphical
var selectedBuilding = "";

var roomsFlag = false;
var selectedRoom = "";

var daysFlag = false; //List only
var selectedDay = null;

var weeksFlag = false; //List & Graphical
var selectedWeek = null;

var statusesFlag = false; //List and Graphical
var selectedStatus = false;



/*
var requestArray = [];

var moduleList = [];

var buildingList = [];

var dayList = [];
*/

function executeFilters() {

    /*
    Make a Copy of Original set of Requests, 
    so that filtering can be redone if
    any of the filtering values are changed
    */
    var filteringRequests = requestArray.slice(0);

    /*
    Each IF statement filters the array and 
    returns it to the same variable,
    allowing the filtering to be controlled purely
    by the flags - this is flag mechanism and filtering
    control, Nathan :D
    */

    if (modulesFlag) filteringRequests = moduleFilter(filteringRequests);

    if (buildingsFlag) filteringRequests = buildingFilter(filteringRequests);

    if (roomsFlag) filteringRequests = roomFilter(filteringRequests);

    if (daysFlag) filteringRequests = dayFilter(filteringRequests);

    if (weeksFlag) filteringRequests = weekFilter(filteringRequests);

    if (statusesFlag) filteringRequests = statusFilter(filteringRequests);

    alert("Filtered Requests Array have:");
    alert(JSON.stringify(filteringRequests));

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

    /*

    Execulte Alogrithm here for filtering by modules.
    Use the variable underneath the flag declaration.
    Must retrun an Array of Request Objects.
    */

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
   // filteredRequests = reqArray; //Temporary, get rid of this later
    
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

  

    /*
    Execulte Alogrithm here for filtering by rooms.
    Use the variable underneath the flag declaration.
    Must retrun an Array of Request Objects
    */

    return filteredRequests;

}

function dayFilter(reqArray) {

    var filteredRequests = [];
    filteredRequests = reqArray; //Temporary, get rid of this later


    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {

        if (reqArray[reqCounter].day === selectedDay) {
            filteredRequests.push(reqArray[reqCounter]);
        }
    }
   /*
    Execulte Alogrithm here for filtering by days.
    Use the variable underneath the flag declaration.
    Must retrun an Array of Request Objects
    */

    return filteredRequests;

}

function weekFilter(reqArray) {

    var filteredRequests = [];
    //filteredRequests = reqArray; //Temporary, get rid of this later

    
    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {
            if (reqArray[reqCounter].weeks[selectedWeek-1] == true) {
                filteredRequests.push(reqArray[reqCounter]);
            }
    
    }
    
    /*
    Execulte Alogrithm here for filtering by weeks.
    Use the variable underneath the flag declaration.
    Must retrun an Array of Request Objects
    */

    return filteredRequests;

}

function statusFilter(reqArray) {

    var filteredRequests = [];
    //filteredRequests = reqArray; //Temporary, get rid of this later

    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) {
        if (reqArray[reqCounter].status == selectedStatus) {
            filteredRequests.push(reqArray[reqCounter]);
        }

    }


    /*
    Execulte Alogrithm here for filtering by statuses.
    Use the variable underneath the flag declaration.
    Must retrun an Array of Request Objects
    */

    return filteredRequests;

}



function createModList() {
    var modlist="";

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

    building += 'building:';
    building += '<select id="selectbuilding">'
    building += '<option data-buildingstate=false value="All">' + "All" + '</option>';
    for (var i = 0; i < buildingList.length; i++) {
        building += '<option data-buildingstate=true value="' + i + '">' + buildingList[i].code + ": " + buildingList[i].name + '</option>';
        
    }

    building += '</select>';
    building1 += '<select id="selectroom">'
    building1 += '<option value="All">' + "All" + '</option>';
    
    building1 += '</select>';
    document.getElementById('buildinglist').innerHTML = building;
    document.getElementById('roomslist').innerHTML = building1;


}

function createRoomList(index) {


    var rooms = "";
    rooms += '<select id="selectroom">'
    rooms += '<option data-roomstate=false value="All">' + "All" + '</option>';

    if (typeof index == "string") {
        for (var j = 0; j < buildingList[index].rooms.length; j++) {
            rooms += '<option data-roomstate=true value="' + buildingList[index].rooms[j].code + '">' + buildingList[index].rooms[j].code + '</option>';
            //rooms += '<option>' + j +'</option>';
        }
    }

    rooms += '</select>';
    document.getElementById('roomslist').innerHTML = rooms;

}



function createDaysList() {
    
    var daylist = "";

    daylist += 'day';
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

    weeklist += 'week';
    weeklist += '<select id="selectweek">'
    weeklist += '<option data-weekstate=false value="All">' + "All" + '</option>';
    for (var i = 1; i <= 15/*(numberOfWeeks)*/; i++) {
        weeklist += '<option data-weekstate=true value="' + i + '">' + i + '</option>';
    }
    weeklist += '</select>';
    document.getElementById('weeklist').innerHTML = weeklist;


}


function createStatusList() {

    var status = "";

    status += 'Status';
    status += '<select id="selectstatus">'
    status += '<option data-statusstate=false value="All">' + "All" + '</option>';
    status += '<option data-statusstate=true value=null>' + "Unsubmitted" + '</option>';
    for (var i = 0; i < statusArray.length ; i++) {
        status += '<option data-statusstate=true value="' + i + '">' + statusArray[i] + '</option>';
    }
    status += '</select>';
    document.getElementById('statuslist').innerHTML = status;


}


function createDepartmentList() {
    var department = "";

    department += '<form>';
    department += '<input type="radio" name="dept">All</input>';
    department += '<input type="radio" name="dept">My Department</input>';
    department += '<input type="radio" name="dept">Others</input>';
    department += '</form>';
    document.getElementById('deptlist').innerHTML = department;

}


function createStageList() {

    var stage = "";
    stage += '<form>';
    stage += '<input type="radio" name="dept">Current</input>';
    stage += '<input type="radio" name="dept">Adhoc</input>';
    stage += '</form>';
    document.getElementById('stagelist').innerHTML = stage;


}



function testRequestList() {

    var testReq = new Request();
    var testReq2 = new Request();
    var testReq3 = new Request();
    var testReq4 = new Request();
    var testReq5 = new Request();

    var module1 = new Module();
    module1.code = "COA101";
    module1.deptCode = "CO";

    var module2 = new Module();
    module2.code = "COA321";
    module2.deptCode = "CO";

    testReq.department = department;

    testReq.round = roundID;

    testReq.id = "1234";
    testReq.module = module1;

    testReq.priority = true;

    testReq.day = 2;
    testReq.startPeriod = 2;
    testReq.endPeriod = 3;
    testReq.weeks = [true, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false];

    testReq.students = 100;
    testReq.park = 0;
    testReq.traditional = true;
    testReq.sessionType = 0;
    testReq.noOfRooms = 1;
    testReq.rooms = ["J.0.01", "J.0.02"];

    testReq.status = 0;

    testReq.facilities = ["10100", "10101"];
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

    testReq2.students = 100;
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

    testReq3.facilities = ["10102"];
    testReq3.otherReqs = "";

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

    testReq4.students = 100;
    testReq4.park = 0;
    testReq4.traditional = true;
    testReq4.sessionType = 2;
    testReq4.noOfRooms = 1;
    testReq4.rooms = ["J.0.01", "J.0.03"];

    testReq4.status = 1;

    testReq4.facilities = ["10102"];
    testReq4.otherReqs = "";

    testReq4.allocatedRooms = ["J.0.02"];

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
    testReq5.traditional = true;
    testReq5.sessionType = 2;
    testReq5.noOfRooms = 1;
    testReq5.rooms = ["N.0.01", "N.0.03"];

    testReq5.status = 1;

    testReq5.facilities = ["10102"];
    testReq5.otherReqs = "";

    testReq5.allocatedRooms = ["N.0.02"];


    return [testReq, testReq2, testReq3, testReq4, testReq5];

}