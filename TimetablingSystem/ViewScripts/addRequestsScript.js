$(document).ready(function () {
    createObjects();
    weekCreator();
    tableCreator();
    modulePopulate();
    facilityPopulate();
    infoStore();

});

//create room/facility/module objects from DB
function createObjects() {
    modulesArray = departmentModules;
    facArray = facilitiesArray;
    buildArray = buildingsWithRooms;
    //create new request for this instance
    newRequest = new Request();
    newRequest.weeks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
}

//creates the week selection row
function weekCreator() {
    var tempStr = "";
    tempStr += "<table class = ''><tr><td>Weeks: ";
    for (var i = 0; i < numberOfWeeks; i++) {
        tempStr += "<input type='checkbox' class='wkInput' id='weekChoice" + i + "' onclick=''>" + (i+1);
    }
    tempStr += "</td></tr><tr><td><input class='button' type='button' value='default' onclick='setWeeks(regularWeeks)'>";
    tempStr += "<input class='button' type='button' value='all' onclick='setWeeks(numberOfWeeks)'>";
    tempStr += "<input class='button' type='button' value='odd' onclick='setWeeks(-1)'>";
    tempStr += "<input class='button' type='button' value='even' onclick='setWeeks(-2)'>";
    tempStr += "<input class='button' type='button' value='clear' onclick='setWeeks(0)'></td></tr>"
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
        tempStr += "<td><label class='facilityLabel'><input type='checkbox' class='specReq' id='" + facArray[i].id + "' onchange='facilityStore(this)'>" + facArray[i].name + "</label></td>";
        if (i % 2 != 0) {
            tempStr += "</tr><tr>";
        }
    }
    tempStr += "<tr><td>Number of students: <input type='textbox' id='CAP' onchange='infoStore()' onclick='infoStore()' value='50'></td></tr>";
    tempStr += "<tr><td>Park: <select id='PRK' onchange='infoStore()' onclick='infoStore()'>";
    for (var j = 0; j < parksArray.length; j++) {
        tempStr += "<option value='"+ parksArray[j] + "'>" + parksArray[j] + "</option>";
    }
    tempStr += "<tr><td>Room type: <select id='RMT' onchange='infoStore()' onclick='infoStore()'>";
    for (var k = 0; k < sessionTypesArray.length; k++) {
        tempStr += "<option value='" + sessionTypesArray[k] + "'>" + sessionTypesArray[k] + "</option>";
    }
    tempStr += "<tr><td>Other requirements: <input type='textbox' onchange='infoStore()' onclick='infoStore()' id='ORE'>";
    tempStr += "<tr><td>Number of rooms: <select id='NOR' onchange='infoStore()' onclick='infoStore()'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option></select></td></tr>"; //FIXME dynamic # of rooms?    
    tempStr += "<tr><td>Priority: <input type='radio' id='PRT' name='priority' value='true' onchange='infoStore()' onclick='infoStore()'>yes<input type='radio' id='PRF' name='priority' value='false' onchange='infoStore()' onclick='infoStore()'>no</td></tr>";
    tempStr += "<tr><td>Type: <input type='radio' id='TRD' name='type' value='true' onchange='infoStore()' onclick='infoStore()'>traditional<input type='radio' id='SMR' name='type' value='false' onchange='infoStore()' onclick='infoStore()'>seminar</td></tr>";
    tempStr += "</select></td></tr></table>";
    $("#propertiesBox").append(tempStr);
}

//creates building filter dropdown
function buildingPopulate() {
    var existSizedRoom = false;
    var tempStr = "Building filter: <select id='buildingSelect' onchange='roomListPopulate()'><option id='buildingRadioAll' value='-1'>All buildings</option>";
    for (var i = 0; i < buildArray.length; i++) {
        existSizedRoom = false;
        for (var j = 0; j < buildArray[i].rooms.length; j++) {
            if (buildArray[i].rooms[j].capacity >= newRequest.students) {
                existSizedRoom = true;
            }
        }
        if (newRequest.park == buildArray[i].park && existSizedRoom == true) {
            tempStr += "<option id='buildingRadio" + buildArray[i].code + "' value='" + i + "'>" + buildArray[i].name + "</option>";
        } else if (newRequest.park == 0 && existSizedRoom == true) {
            tempStr += "<option id='buildingRadio" + buildArray[i].code + "' value='" + i + "'>" + buildArray[i].name + "</option>";
        }
    }
    tempStr += "</select>";
    $('#buildingList').empty();
    $('#buildingList').append(tempStr);
}

//creates the list of rooms filtered by the building
//-1 signifies all buildings
function roomListPopulate() {
    var tempStr = "";
    var buildNum = $("#buildingSelect").val();
    //all parks, all buildings
    if ((buildNum == -1) && (newRequest.park == 0)) {

        for (var j = 0; j < buildArray.length; j++) {

            var chosenBuilding = buildArray[j];

            for (var i = 0; i < chosenBuilding.rooms.length; i++) {

                var facAvail = true;

                for (var k = 0; k < newRequest.facilities.length; k++) if (chosenBuilding.rooms[i].facilities.indexOf(newRequest.facilities[k]) == -1) facAvail = false;

                if ((chosenBuilding.rooms[i].capacity >= newRequest.students) && (facAvail)) tempStr += "<input type='checkbox' class='roomList' id='" + chosenBuilding.rooms[i].code + "' onclick='checkedRoomList(this)' data-counter='room-" + i + "' data-cap='" + chosenBuilding.rooms[i].capacity + "'>" + chosenBuilding.rooms[i].code.split('.').join("") + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
                
            }
        }
    //all buildings, specific park
    } else if (buildNum == -1) {
        
        for (var j = 0; j < buildArray.length; j++) {

            var chosenBuilding = buildArray[j];

            for (var i = 0; i < chosenBuilding.rooms.length; i++) {

                var facAvail = true;

                for (var k = 0; k < newRequest.facilities.length; k++) if (chosenBuilding.rooms[i].facilities.indexOf(newRequest.facilities[k]) == -1) facAvail = false;
                
                if ((chosenBuilding.rooms[i].capacity >= newRequest.students) && (chosenBuilding.park == newRequest.park) && (facAvail == true)) tempStr += "<input type='checkbox' id='" + chosenBuilding.rooms[i].code + "' class='roomList' onclick='checkedRoomList(this)' data-counter='room-" + i + "' data-cap='" + chosenBuilding.rooms[i].capacity + "'>" + chosenBuilding.rooms[i].code.split('.').join("") + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
                
            }
        }

    //specific building
    } else {
        
        var chosenBuilding = buildArray[buildNum];

        for (var i = 0; i < chosenBuilding.rooms.length; i++) {
            var facAvail = true;

            for (var k = 0; k < newRequest.facilities.length; k++) if (chosenBuilding.rooms[i].facilities.indexOf(newRequest.facilities[k]) == -1) facAvail = false;
            
            if ((chosenBuilding.rooms[i].capacity >= newRequest.students) && (facAvail == true)) tempStr += "<input type='checkbox' id='" + chosenBuilding.rooms[i].code + "' class='roomList' onclick='checkedRoomList(this)' data-counter='room-" + i + "' data-cap='" + chosenBuilding.rooms[i].capacity + "'>" + chosenBuilding.rooms[i].code.split('.').join("") + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
            
        }
        
    }
    $('#roomList').empty();
    $('#roomList').append(tempStr);
}

//tick
//copy ticked checkboxes to second list that has chosen rooms
//push the chosen room to the request
//untick
//remove room from chosen rooms
//remove the room div
function checkedRoomList(checkbox) {
    tempStr = "";
    pushID = checkbox.id;
    if ($(checkbox).is(":checked")) {

        tempStr += "<div id='divPicked-" +
            checkbox.id.split('.').join("") +
            "'><input type='checkbox' checked='true' id='picked-" +
            checkbox.id + "' val ='" + checkbox.id + "' data-cap='" +
            $(checkbox).attr('data-cap') + "' onclick='removeCheckedRoom(this)'>" +
            checkbox.id.split('.').join("") + " (capacity: " + $(checkbox).attr('data-cap') + ")</input></div>";

        $('#chosenRoomsList').append(tempStr);
        newRequest.rooms.push(pushID);
    } else if ($(checkbox).is(":not(:checked)"))
    {
        newRequest.rooms.splice(newRequest.rooms.indexOf(pushID), 1);
        $("#divPicked-" + checkbox.id.split('.').join("")).remove();
    }
    console.log(newRequest.rooms);
}

//stores all the non-facility requirements in the request object
function infoStore() {
    newRequest.students = parseInt($("#CAP").val(), 10);
    newRequest.park = $('#PRK').get(0).selectedIndex;
    newRequest.sessionTypesArray = $('#RMT').get(0).selectedIndex;
    newRequest.otherReqs = $("#ORE").val();
    newRequest.noOfRooms = parseInt($("#NOR").val(), 10);
    var modIndex = $("#modCodeSelect").get(0).selectedIndex;

    newRequest.module = modulesArray[modIndex];
    $('#PRT').click(function () {
        newRequest.priority = true;
    });
    $('#PRF').click(function () {
        newRequest.priority = false;
    });
    $('#TRD').click(function () {
        newRequest.traditional = true;
    });
    $('#SMR').click(function () {
        newRequest.traditional = false;
    });
    for (var i = 0; i < numberOfWeeks; i++) {
        if ($("#weekChoice" + i).prop("checked")) {
            newRequest.weeks[i] = true;
        } else {
            newRequest.weeks[i] = false;
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
        newRequest.facilities.push(parseInt(checkbox.id));
    }
    if (checkbox.checked == false) {
        newRequest.facilities = newRequest.facilities.splice(parseInt(checkbox.id), 1);
    }
    infoStore();
}

//creates array of time/dates for the request(s)
function timeAndDay() {
    infoStore();

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
//passes it to the request or ad-hoc request
function multiRequestGen(timeDayArray) {
    for (var i = 0; i < timeDayArray.length; i++) {
        singleRequest = newRequest;
        singleRequest.day = timeDayArray[i].day;
        singleRequest.startPeriod = timeDayArray[i].start;
        singleRequest.endPeriod = timeDayArray[i].end;
        var temp = setupDBRequestModel(singleRequest);
        if ($('#adhoc').prop('checked', true)) {
            addAdHocRequest(temp);
        } else {
            addCurrentRequest(temp);
        }
    }
}

//pushes the json-ified data to the database
function addCurrentRequest(jsonData) {

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
            alert("request submission successful");
            alert(results);
        },
        error: function (results) {
            alert("request submission failed");
            alert(JSON.stringify(results));
        },
        url: "api/request/PostNewRequest",
        processData: false
    });

}

function addAdHocRequest(jsonData) {

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
            alert("request submission successful");
            alert(results);
        },
        error: function (results) {
            alert("request submission failed");
            alert(JSON.stringify(results));
        },
        url: "api/request/PostNewAdHocRequest",
        processData: false
    });

}

//sets week checkboxes to chosen selection (default/odd/even/clear)
//-1 signifies odd, -2 signifies even
function setWeeks(weeksChosen) {
    if (weeksChosen == -1) {
        for (var i = 0; i < regularWeeks; i++) {
            if (i % 2 == 0) {
                $('#weekChoice' + i).prop('checked', true);
            } else {
                $('#weekChoice' + i).prop('checked', false);
            }
        }
    } else if (weeksChosen == "-2") {
        for (var i = 0; i < regularWeeks; i++) {
            if (i % 2 != 0) {
                $('#weekChoice' + i).prop('checked', true);
            } else {
                $('#weekChoice' + i).prop('checked', false);
            }
        }
    } else {
        for (var i = 0; i < numberOfWeeks; i++) {
            if (i < weeksChosen) {
                $('#weekChoice' + i).prop('checked', true);
            } else {
                $('#weekChoice' + i).prop('checked', false);
            }
        }
    }
}

//clears checked tickboxes of rooms selected
function clearRoomSel() {
    $('#roomList input:checkbox').attr('checked', false);
}

//remove checked item when unticked
function removeCheckedRoom(checkbox) {
    $($(checkbox).parent()).remove();
}
