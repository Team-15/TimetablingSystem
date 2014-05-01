$(document).ready(function () {
    newRequest = new Request();
    createObjects();
    weekCreator();
    tableCreator();
    modulePopulate();
    facilityPopulate();
    roomListPopulate();
});


function createObjects() {
    //dummy modules till we have the db dataaaa
    module1 = new Module();
    module2 = new Module();
    module3 = new Module();
    module4 = new Module();
    modulesArray = [module1, module2, module3, module4];
    module1.code = "COA123";
    module2.code = "4940KK";
    module3.code = "AARETA";
    module4.code = "DBR466";
    module1.title = "useless module";
    module2.title = "boring module";
    module3.title = "FUN STUFF";
    module4.title = "sleeping time";
    module1.deptCode = "CO";
    module2.deptCode = "CO";
    module3.deptCode = "CO";
    module4.deptCode = "CO";
    module1.active = true;
    module2.active = true;
    module3.active = true;
    module4.active = true;
    //dummy facilities till we have the db DATA hurry up JB ;)
    facility1 = new Facility();
    facility2 = new Facility();
    facilityArray = [facility1, facility2];
    facility1.id = 0;
    facility2.id = 1;
    facility1.name = "table tennis";
    facility2.name = "skydiving";
    //dummy rooms till we have the DB JEEZ HE'S TAKING FUCKING AGES
    room1 = new Room();
    room2 = new Room();
    roomsArray = [room1, room2];
    room1.code = "N.0.01";
    room2.code = "N.0.02";
    room1.type = "Lab";
    room2.type = "Lecture";
    room1.capacity = 50;
    room2.capacity = 80;
    room2.facilities = [0,1];
    room2.facilities = [2];
    //create new request for this instance
    newRequest = new Request();
}

//FIXME finish the rest of these being stored in the facility array
//store user-chosen facilities in request instance
function facilityStore(checkbox) {
    if (checkbox.checked == true) {
        newRequest.facilities.push(checkbox.id);
    }
}

function sizeLocation() {
    newRequest.otherReqs = $("#ORE").val();
    newRequest.students = $("#CAP").val();
    newRequest.priority = ($("#PRY").selected ? true : false);
    newRequest.noOfRooms = $("#NOR").val();
}

//populate module titles and codes
function modulePopulate() {
    var codeStr;

    for (var i = 0; i < modulesArray.length; i++) {
        $("#modTitleSelect").append("<option value='" + modulesArray[i].title + "'>" + modulesArray[i].title + "</option>");
    }
    for (var i = 0; i < modulesArray.length; i++) {
        $("#modCodeSelect").append("<option value='" + modulesArray[i].code + "'>" + modulesArray[i].code + "</option>");
    }
}

function weekCreator() {
    numberOfWeeks = 15; //temp set
    var tempStr = "";
    tempStr += "<table class = ''>Weeks: ";
    for (var i = 1; i <= numberOfWeeks; i++) {
        tempStr += "<input type='checkbox' class='wkInput' id='weekChoice" + i + "' onclick=''>" + i;
    }
    $("#weekSelect").append(tempStr);
}

//creates period grid selector
function tableCreator() {
    var tempStr = "";
    tempStr += "<table class = 'gridTable'><tr><th rowspan='2'>Day</th><th colspan='9'>Times / Periods</th><tr>";
    for (var h = 0; h < startPeriodsArray.length; h++) {
        tempStr += "<th class = gridHeader>" + startPeriodsArray[h] + " - " + endPeriodsArray[h] + "</th>";
    }
    tempStr += "</tr>";
    for (var i = 0; i < 5; i++) {
        tempStr += "<tr> <td onclick='tableSelector(this.id)' class='gridHeader' id=gridHeader" + i + ">" + shortDaysArray[i] + "</td>";
        for (var j = 0; j < 9; j++) {
            tempStr += "<td onclick='tableSelector(this.id)'class='gridWeek' id=gridWeek" + i + j + ">no</td>";
        }
        tempStr += "</tr>";
    }
    tempStr += "</table>";
    $("#weekTable").append(tempStr);
}

//tracks user-selected periods in the period grid
function tableSelector(gridRef) {
    if ($("#" + gridRef).attr('class') != 'gridBooked') {
        if ($("#" + gridRef).hasClass('gridClicked')) {
            $("#" + gridRef).removeClass("gridClicked");
            $("#" + gridRef).addClass("grid");
            console.log(gridRef + " disabled");
            $("#" + gridRef).html("no");
        } else {
            $("#" + gridRef).removeClass("grid");
            $("#" + gridRef).addClass("gridClicked");
            console.log(gridRef + " enabled");
            $("#" + gridRef).html("yes");
        }
    }
}

//FIXME convert facilities to be spawned here
function facilityPopulate() {
    var tempStr = "";
    tempStr += "<table class='table reqTable'>";
    for (var i = 0; i < facilityArray.length; i++) {
        tempStr += "<td><input type='checkbox' class='specReq' id='" + facilityArray[i].id + "' onchange='facilityStore(this)'>" + facilityArray[i].name + "</td>";
    }
    tempStr += "<tr><td>Number of students: <input type='textbox' id='CAP' onchange='sizeLocation()' value='50'></td></tr>";
    tempStr += "<tr><td>Park: <select id='parkSel'>";
    for (var j = 0; j < parksArray.length; j++) {
        tempStr += "<option value='"+ parksArray[j] + "'>" + parksArray[j] + "</option>";
    }
    tempStr += "<tr><td>Other requirements: <input type='textbox' onchange='sizeLocation()' id='ORE'>";
    tempStr += "<tr><td>Number of rooms: <select id='NOR' onchange='sizeLocation()'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option></select></td></tr>"; //FIXME dynamic # of rooms?    
    tempStr += "<tr><td>Priority: <input type='radio' id='PRT' name='priority' value='true' onchange='sizeLocation()'>yes<input type='radio' id='PRF' name='priority' value='false' onchange='sizeLocation()'>no</td></tr>";
    tempStr += "</select></td></tr></table>";
    $("#propertiesBox").append(tempStr);
}

function roomListPopulate() {
    var tempStr = "";
    for (var i = 0; i < roomsArray.length; i++) {
        tempStr += "<input type='checkbox' id='" + roomsArray[i].code + "' data-counter='room-" + i + "'>" + roomsArray[i].code + " (capacity: " + roomsArray[i].capacity + ")<br>";
    }
    tempStr += "<input type='button' value='clear' onclick='clearRoomSel()'>";
    tempStr += "<input type='button' value='sort' onclick='sortCap()'>";
    $('#roomList').append(tempStr);
}

function clearRoomSel() {
    for (var i = 0; i < roomsArray.length; i++) {
        $('input[data-counter="room-' + i + '"]').attr('checked', false);
    }
}

function moduleSelector(changedValue) {
    var tempStr = $(changedValue).val();
    for (var i = 0; i < modulesArray.length; i++) {
        if (modulesArray[i].title == tempStr) {
            $("#modCodeSelect").val(modulesArray[i].code);
        } else if (modulesArray[i].code == tempStr) {
            $("#modTitleSelect").val(modulesArray[i].title);
        }
    }
}
