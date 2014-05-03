$(document).ready(function () {
    createObjects();
    weekCreator();
    tableCreator();
    modulePopulate();
    facilityPopulate();
    buildingPopulate();
});

//create room/facility/module objects from DB
function createObjects() {
    modulesArray = departmentModules;
    facArray = facilitiesArray;
    buildArray = buildingsWithRooms;
    //create new request for this instance
    newRequest = new Request();
}

//store user-chosen facilities in request instance
function facilityStore(checkbox) {
    if (checkbox.checked == true) {
        newRequest.facilities.push(checkbox.id);
    }
}

//stores all the non-facility requirements in the request object
function infoStore() {
    newRequest.students = $("#CAP").val();
    newRequest.park = $('#PRK').get(0).selectedIndex;
    newRequest.otherReqs = $("#ORE").val();
    newRequest.noOfRooms = $("#NOR").val();
    $('#PRT').click(function () {
        newRequest.priority = true;
    });
    $('#PRF').click(function () {
        newRequest.priority = false;
    });
    //wipe week array 
    //check each week checkbox,
    //and add currently ticked weeks
    while(newRequest.weeks.length > 0) {
        newRequest.weeks.pop();
    }
    for (var i = 1; i <= numberOfWeeks; i++) {
        if ($("#weekChoice" + i).prop("checked")) {
                    newRequest.weeks.push(i);
        }
    }
    buildingPopulate();
    roomListPopulate();
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

//creates the week selection row
function weekCreator() {
    numberOfWeeks = 15; //temp set
    var tempStr = "";
    tempStr += "<table class = ''><tr><td>Weeks: ";
    for (var i = 1; i <= numberOfWeeks; i++) {
        tempStr += "<input type='checkbox' class='wkInput' id='weekChoice" + i + "' onclick=''>" + i;
    }
    tempStr += "</td></tr><tr><td><input type='button' value='default' onclick='setWeeks(regularWeeks)'><input type='button' value='all' onclick='setWeeks(numberOfWeeks)'><input type='button' value='clear' onclick='clearWeeks()'></td></tr>"
    $("#weekSelect").append(tempStr);
}

//creates period grid selector
function tableCreator() {
    var tempStr = "";
    tempStr += "<table class = 'gridTable'><tr><th rowspan='2'>Day</th><th colspan='9'>Times / Periods</th><tr>";
    for (var h = 0; h < startPeriodsArray.length; h++) {
        tempStr += "<th class = gridHeader>" + timeDisplayArray[h] + "</th>";
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

//inserts facilities and requirements
function facilityPopulate() {
    var tempStr = "";
    tempStr += "<table class='table reqTable'><tr>";
    for (var i = 0; i < facArray.length; i++) {
        tempStr += "<td><input type='checkbox' class='specReq' id='" + facArray[i].id + "' onchange='facilityStore(this)'>" + facArray[i].name + "</td>";
        if (i % 2 != 0) {
            tempStr += "</tr><tr>";
        }
    }
    tempStr += "<tr><td>Number of students: <input type='textbox' id='CAP' onchange='infoStore()' onclick='infoStore()' value='50'></td></tr>";
    tempStr += "<tr><td>Park: <select id='PRK' onchange='infoStore()' onclick='infoStore()'>";
    for (var j = 0; j < parksArray.length; j++) {
        tempStr += "<option value='"+ parksArray[j] + "'>" + parksArray[j] + "</option>";
    }
    tempStr += "<tr><td>Other requirements: <input type='textbox' onchange='infoStore()' onclick='infoStore()' id='ORE'>";
    tempStr += "<tr><td>Number of rooms: <select id='NOR' onchange='infoStore()' onclick='infoStore()'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option></select></td></tr>"; //FIXME dynamic # of rooms?    
    tempStr += "<tr><td>Priority: <input type='radio' id='PRT' name='priority' value='true' onchange='infoStore()' onclick='infoStore()'>yes<input type='radio' id='PRF' name='priority' value='false' onchange='infoStore()' onclick='infoStore()'>no</td></tr>";
    tempStr += "</select></td></tr></table>";
    $("#propertiesBox").append(tempStr);
}

//creates the list of rooms filtered by the building
function roomListPopulate() {
    var tempStr = "";
    var buildNum = $("#buildingSelect").val();
    if (buildNum == -1) {
        for (var j = 0; j < buildArray.length; j++) {
            var chosenBuilding = buildArray[j];
            for (var i = 0; i < chosenBuilding.rooms.length; i++) {
                if (chosenBuilding.rooms[i].capacity >= newRequest.students) {
                    tempStr += "<input type='checkbox' id='" + chosenBuilding.rooms[i].code + "' data-counter='room-" + i + "'>" + chosenBuilding.rooms[i].code + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
                }
            }
        }
    } else {
        var chosenBuilding = buildArray[buildNum];

        for (var i = 0; i < chosenBuilding.rooms.length; i++) {
            if (chosenBuilding.rooms[i].capacity >= newRequest.students) {
                tempStr += "<input type='checkbox' id='" + chosenBuilding.rooms[i].code + "' data-counter='room-" + i + "'>" + chosenBuilding.rooms[i].code + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
            }
        }
    }
    tempStr += "<input type='button' value='clear selection' onclick='clearRoomSel()'>";
    tempStr += "<input type='button' value='sort by capacity' onclick='sortRooms()'>";
    $('#roomList').empty();
    $('#roomList').append(tempStr);
}

//creates building filter dropdown
function buildingPopulate() {
    var tempStr = "Building filter: <select id='buildingSelect' onchange='roomListPopulate()'>";
    for (var i = 0; i < buildArray.length; i++) {
        if (newRequest.park == buildArray[i].park) {
            tempStr += "<option id='buildingRadio" + buildArray[i].code + "' value='" + i + "'>" + buildArray[i].name + "</option>";
        } else if (newRequest.park == 0) {
            tempStr += "<option id='buildingRadio" + buildArray[i].code + "' value='" + i + "'>" + buildArray[i].name + "</option>";
        }
    }
    tempStr += "</select>";
    $('#buildingList').empty();
    $('#buildingList').append(tempStr);
}

//clears checked tickboxes of rooms selected
function clearRoomSel() {
    $('#roomList input:checkbox').attr('checked', false);
}

//clears checked tickboxes of weeks selected
function clearWeeks() {
    for (var i = 0; i <= numberOfWeeks; i++) {
       $('#weekChoice' + i).prop('checked', false);
    }
}

//sets week checkboxes to default selection
function setWeeks(weeksChosen) {
    for (var i = 0; i <= weeksChosen; i++) {
        $('#weekChoice' + i).prop('checked', true);
    }
}

//keeps the dual-module dropdowns the same
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

//sorts rooms by capacity or alphabetically
function sortRooms() {
    
}
