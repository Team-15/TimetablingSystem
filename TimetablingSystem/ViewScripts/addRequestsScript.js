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
    for (var h = 0; h < periodsArray.length; h++) {
        tempStr += "<th class = gridHeader>" + timeDisplayArray[h] + "</th>";
    }
    tempStr += "</tr>";
    for (var i = 0; i < 5; i++) {
        tempStr += "<tr> <td class='gridHeader'><input type='checkbox' id=gridHeader" + i + "'>" + shortDaysArray[i] + "</input></td>";
        for (var j = 0; j < 9; j++) {
            tempStr += "<td class='gridWeek'><input type='checkbox' id=gridCheck-" + i + j + ">no</input></td>";
        }
        tempStr += "</tr>";
    }
    tempStr += "</table>";
    $("#weekTable").append(tempStr);
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

//creates building filter dropdown
function buildingPopulate() {
    var tempStr = "Building filter: <select id='buildingSelect' onchange='roomListPopulate()'><option id='buildingRadioAll' value='-1'>All buildings</option>";
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

//creates the list of rooms filtered by the building
function roomListPopulate() {
    var tempStr = "";
    var buildNum = $("#buildingSelect").val();
    if (buildNum == -1 && newRequest.park == 0) {
        for (var j = 0; j < buildArray.length; j++) {
            var chosenBuilding = buildArray[j];
            for (var i = 0; i < chosenBuilding.rooms.length; i++) {
                if (chosenBuilding.rooms[i].capacity >= newRequest.students) {
                    tempStr += "<input type='checkbox' id='" + chosenBuilding.rooms[i].code + "' onclick='checkedRoomList(this)' data-counter='room-" + i + "'>" + chosenBuilding.rooms[i].code + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
                }
            }
        }
    } else if (buildNum == -1) {
        for (var j = 0; j < buildArray.length; j++) {
            var chosenBuilding = buildArray[j];
            for (var i = 0; i < chosenBuilding.rooms.length; i++) {
                if (chosenBuilding.rooms[i].capacity >= newRequest.students && buildArray[j].park == newRequest.park) {
                    tempStr += "<input type='checkbox' id='" + chosenBuilding.rooms[i].code + "' onclick='checkedRoomList(this)' data-counter='room-" + i + "' data-cap='" + chosenBuilding.rooms[i].capacity + "'>" + chosenBuilding.rooms[i].code + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
                }
            }
        }
    } else {
        var chosenBuilding = buildArray[buildNum];
        for (var i = 0; i < chosenBuilding.rooms.length; i++) {
            if (chosenBuilding.rooms[i].capacity >= newRequest.students) {
                tempStr += "<input type='checkbox' id='" + chosenBuilding.rooms[i].code + "' onclick='checkedRoomList(this)' data-counter='room-" + i + "' data-cap='" + chosenBuilding.rooms[i].capacity + "'>" + chosenBuilding.rooms[i].code + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
            }
        }
    }
    tempStr += "<input type='button' value='clear selection' onclick='clearRoomSel()'>";
    tempStr += "<input type='button' value='sort by capacity' onclick='sortRooms()'>";
    $('#roomList').empty();
    $('#roomList').append(tempStr);
}



//stores all the non-facility requirements in the request object
function infoStore() {
    newRequest.students = $("#CAP").val();
    newRequest.park = $('#PRK').get(0).selectedIndex;
    newRequest.otherReqs = $("#ORE").val();
    newRequest.noOfRooms = $("#NOR").val();
    var modIndex = $("#modCodeSelect").get(0).selectedIndex;

    newRequest.module = modulesArray[modIndex];
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
                    newRequest.weeks[i] = true;
        }
    }
    buildingPopulate();
    roomListPopulate();
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



//store user-chosen facilities in request instance
function facilityStore(checkbox) {
    if (checkbox.checked == true) {
        newRequest.facilities.push(checkbox.id);
    }
}



//creates array of time/dates for the request(s)
function timeAndDay() {

    //Set up 2D array
    var timeDayArray = [];
    while (timeDayArray.push([]) < daysArray.length);

    //read all checkboxes and push ticked ones into a 2D array
    for (var i = 0; i < daysArray.length; i++) for (var j = 0; j < periodsArray.length; j++)  if ($("#gridCheck-" + i + j).prop('checked')) timeDayArray[i].push(j);

    var dayWithkeyPoints = [];

    //find contingent blocks of checkboxes and make them into individual requests
    for (var counter = 0; counter < timeDayArray.length; counter++) dayWithkeyPoints[counter] = secondSorter(timeDayArray[counter]);


    var dayPeriodBlock = [];

    for (var dwkpCounter = 0; dwkpCounter < dayWithkeyPoints.length; dwkpCounter++) {

        var keyPointsArray = dayWithkeyPoints[dwkpCounter];

        for (var counter = 0; counter < keyPointsArray.length; counter++) {

            var maxElement = keyPointsArray[counter].length - 1;

            if (keyPointsArray[counter][0] == keyPointsArray[counter][maxElement]) {

                dayPeriodBlock.push({
                    day: dwkpCounter,
                    start: keyPointsArray[counter][0],
                    end: keyPointsArray[counter][0]
                });

            }
            else {

                dayPeriodBlock.push({
                    day: dwkpCounter,
                    start: keyPointsArray[counter][0],
                    end: keyPointsArray[counter][maxElement]
                });

            }

        }

    }

    alert(JSON.stringify(dayPeriodBlock));
    multiRequestGen(dayPeriodBlock);

}

//second level sorter
function secondSorter(arrayToSort) {
    var keyPoints = [];
    var keyPointsArray = [];
    for (var i = 0; i < arrayToSort.length; i++) {
        if ((arrayToSort[i] + 1) != (arrayToSort[i + 1])) {
            keyPoints.push(arrayToSort[i]);
            keyPointsArray.push(keyPoints);
            keyPoints = [];
        } else keyPoints.push(arrayToSort[i]);
    }

    return (keyPointsArray);
}

//duplicates newRequest to number needed for day/time grid
function multiRequestGen(timeDayArray) {
    console.log(newRequest);
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



//clears checked tickboxes of rooms selected
function clearRoomSel() {
    $('#roomList input:checkbox').attr('checked', false);
}

//sorts rooms by capacity or alphabetically
function sortRooms() {
    
}

//remove checked item when unticked
function removeCheckedRoom(checkbox) {
    $($(checkbox).parent()).remove();
}

//copy ticked checkboxes to second list that has chosen rooms
//push the chosen room to the request
function checkedRoomList(checkbox) {
    tempStr = "";
    tempStr += "<div id='divPicked-" + checkbox.id + "'><input type='checkbox' checked='true' id='picked-" + checkbox.id + "' val ='" + checkbox.id + "' data-cap='" + $(checkbox).attr('data-cap') + "' onclick='removeCheckedRoom(this)'>" + checkbox.id + " (capacity: " + $(this).attr('data-cap') + ")</input></div>";
    $('#chosenRoomsList').append(tempStr);
    newRequest.rooms.push(checkbox.id);
}
