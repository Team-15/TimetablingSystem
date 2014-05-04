$(document).ready(function () {
    buildingList = [];
    requestArray = [];
    testRequestList();
    moduleList = departmentModules;
    buildingList = buildingsWithRooms;
    dayList = daysArray;
    createModList();
    createBuildingList();
    createDaysList();
    createWeekList();
    createStatusList();
    createDepartmentList();
    createStageList();
    //var index = document.getElementById("selectbuilding").value
    $("#selectbuilding").change(function () {
       var index = document.getElementById("selectbuilding").value;
       createRoomList(index);
    });
    //alert(buildingList[2].rooms[0].code);
    //alert(JSON.stringify(buildingList));


});

$("#selectmod").change(function () {
    alert(document.getElementById("selectmod").value);
    
});


var requestArray = null;

var moduleList = [];

//var buildingList = null;

var dayList = [];


function createModList() {
    var modlist="";

    modlist += 'Modules:';
    modlist += '<select id="selectmod">'
    modlist += '<option value="All">' + "All" + '</option>';
    for (var i = 0; i < moduleList.length; i++) {
        modlist += '<option value="'+moduleList[i].code+'">' + moduleList[i].code + ": " + moduleList[i].title +'</option>';
    }
    modlist += '</select>';
    document.getElementById('modulelist').innerHTML = modlist;
}


function createBuildingList() {
    var building = "";
    var building1 = "";

    building += 'building:';
    building += '<select id="selectbuilding">'
    building += '<option value="All">' + "All" + '</option>';
    for (var i = 0; i < buildingList.length; i++) {
       building += '<option value="'+i+'">' + buildingList[i].code + ": " + buildingList[i].name + '</option>';
        // building += '<option>'+"building"+i+'</option>';
    }
   //index = document.getElementById("selectbuilding").value
    building += '</select>';
    building1 += '<select id="selectroom">'
    building1 += '<option value="All">' + "All" + '</option>';
    //for (var j = 0; j < buildingList[i].rooms.length; j++) {
       // building += '<option value="' + buildingList[i].rooms[j].code + '">' + buildingList[i].rooms[j].code + '</option>';
       //building += '<option>' + j +'</option>';
    
    building1 += '</select>';
    document.getElementById('buildinglist').innerHTML = building;
    document.getElementById('roomslist').innerHTML = building1;


}

function createRoomList(index) {


        var rooms = "";
        rooms += '<select id="selectroom">'
        for (var j = 0; j < buildingList[index].rooms.length; j++) {
            rooms += '<option value="' + buildingList[index].rooms[j].code + '">' + buildingList[index].rooms[j].code + '</option>';
        //rooms += '<option>' + j +'</option>';
        }
        rooms += '</select>';
        document.getElementById('roomslist').innerHTML = rooms;
}



function createDaysList() {
    
    var daylist = "";

    daylist += 'day';
    daylist += '<select id="selectday">'
    daylist += '<option value="All">' + "All" + '</option>';
    for (var i = 0; i < dayList.length; i++) {
        daylist += '<option value="' + dayList[i]+'">' + dayList[i] + '</option>';
    }
    daylist += '</select>';
    document.getElementById('dayslist').innerHTML = daylist;

}

function createWeekList() {

    var weeklist = "";

    weeklist += 'week';
    weeklist += '<select id="selectweek">'
    weeklist += '<option value="All">' + "All" + '</option>';
    for (var i = 1; i <= 15/*(numberOfWeeks)*/; i++) {
        weeklist += '<option value="'+i+'">'+i+'</option>';
    }
    weeklist += '</select>';
    document.getElementById('weeklist').innerHTML = weeklist;


}

function createStatusList() {

    var status = "";

    status += 'Status';
    status += '<select id="selectstatus">'
    status += '<option value="All">' + "All" + '</option>';
    status += '<option>' + "Unsubmitted" + '</option>';
    for (var i = 0; i < statusArray.length ; i++) {
        status += '<option value="'+statusArray[i]+'">' + statusArray[i] + '</option>';
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
    stage += '<input type="radio" name="dept">All</input>';
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

    testReq.department = "CO";

    testReq.round = 1;

    testReq.id = "1234";
    testReq.moduleCode = "COB123";
    testReq.moduleTitle = "Test Module Title";

    testReq.priority = true;

    testReq.day = 2;
    testReq.startPeriod = 2;
    testReq.endPeriod = 2;
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


    requestArray.push(testReq);


    testReq2.department = "CO";

    testReq2.round = 1;

    testReq2.id = "1235";
    testReq2.moduleCode = "COB124";
    testReq2.moduleTitle = "Test Module Title";

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


    requestArray.push(testReq2);


    testReq3.department = "CO";

    testReq3.round = 1;

    testReq3.id = "1236";
    testReq3.moduleCode = "COB125";
    testReq3.moduleTitle = "Test Module Title";

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


    requestArray.push(testReq3);


    testReq3.department = "CO";

    testReq4.round = 1;

    testReq4.id = "1236";
    testReq4.moduleCode = "COB126";
    testReq4.moduleTitle = "Test Module Title";

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
    testReq4.rooms = ["N.0.01", "N.0.03"];

    testReq4.status = 1;

    testReq4.facilities = ["10102"];
    testReq4.otherReqs = "";

    testReq4.allocatedRooms = ["N.0.02"];

    requestArray.push(testReq4);

    testReq4.round = 1;

    testReq5.id = "1236";
    testReq5.moduleCode = "COB123";
    testReq5.moduleTitle = "Test Module Title";

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

    requestArray.push(testReq5);

}