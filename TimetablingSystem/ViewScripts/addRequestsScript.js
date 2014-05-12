$(document).ready(function () {
    createObjects();
    weekCreator();
    tableCreator();
    modulePopulate();
    facilityPopulate();
    infoStore();
    if ((duplicateRequestFlag == true) || (editRequestFlag == true)) {
        loadInRequest();
    }
});

//create room/facility/module objects from DB
function createObjects() {
    modulesArray = departmentModules;
    facArray = facilitiesArray;
    buildArray = buildingsWithRooms;
    //create new request for this instance
    newRequest = new Request();
    newRequest.weeks = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
}

function clearForm() {
    $("#addPageBtn").click();
}

//creates the week selection row
function weekCreator() {
    var tempStr = "";
    tempStr += "<table class = ''><tr><td>Weeks: ";
    for (var i = 0; i < numberOfWeeks; i++) {
        tempStr += "<input style='display:none' type='checkbox' class='wkInput' id='weekChoice" + i + "' onclick=''><label for='weekChoice" + i + "' class='btn btn-default'>" + (i + 1) + "</label>";
    }
    tempStr += "&nbsp;|&nbsp;";
    tempStr += "</td><td><input class='btn btn-default' type='button' value='default' onclick='setWeeks(regularWeeks)'>";
    tempStr += "<input class='btn btn-default' type='button' value='all' onclick='setWeeks(numberOfWeeks)'>";
    tempStr += "<input class='btn btn-default' type='button' value='odd' onclick='setWeeks(-1)'>";
    tempStr += "<input class='btn btn-default' type='button' value='even' onclick='setWeeks(-2)'>";
    tempStr += "<input class='btn btn-default' type='button' value='clear' onclick='setWeeks(0)'></td></tr>"
    $("#weekSelect").append(tempStr);
}

function timePeriodToggle() {
    if ($("#timePeriodCheck").is(":checked")) {
        for (var i = 0; i < periodsArray.length; i++) {
            $("#TP-" + i).html(periodsArray[i]);
        }
    } else {
        for (var i = 0; i < periodsArray.length; i++) {
            $("#TP-" + i).html(timeDisplayArray[i]);
        }
    }
}

//creates period grid selector
function tableCreator() {
    var tempStr = "";
    tempStr += "<table class = 'table-bordered' width='100%'><tr><th rowspan='2'>Day</th><th colspan='9'><input id='timePeriodCheck' style='display:none' type='checkbox' onclick='timePeriodToggle()'><label for='timePeriodCheck' class='btn btn-default'>Times / Periods</label><input id='clearGrid' class='btn btn-default' type='button' value='clear table' onclick='clearTableGrid()'></th><tr>";
    for (var h = 0; h < periodsArray.length; h++) {
        tempStr += "<th class = gridHeader><div id='TP-" + h + "'>" + timeDisplayArray[h] + "</div></th>";
    }
    tempStr += "</tr>";
    for (var i = 0; i < 5; i++) {
        tempStr += "<tr> <td class='gridHeader'><input style='display:none' type='checkbox' value='" + daysArray[i] + "' id='gridHeader" + i + "' onclick='setGridWeek(this)' ></input><label for='gridHeader" + i + "' class='btn btn-default'> " + daysArray[i] + "</label></td>";
        for (var j = 0; j < 9; j++) {
            tempStr += "<td class='gridWeek'><label for='gridCheck-" + i + j + "' class='gridLabel' ><input type='checkbox' id=gridCheck-" + i + j + " /><div class='gridBox'></div></td></label>";
        }
        tempStr += "</tr>";
    }
    tempStr += "</table>";
    tempStr += "";
    $("#weekTable").append(tempStr);
}

function setGridWeek(whichDay) {
    i = daysArray.indexOf($(whichDay).val());
    if ($(whichDay).is(":checked")) {
        for (var j = 0; j < periodsArray.length; j++) {
            $("#gridCheck-" + i + j).prop('checked', true);
        }
    } else {
        for (var j = 0; j < periodsArray.length; j++) {
            $("#gridCheck-" + i + j).prop('checked', false);
        }
    }
}

function clearTableGrid() {
    for (var i = 0; i < daysArray.length; i++) {
        for (var j = 0; j < periodsArray.length; j++) {
            $("#gridCheck-" + i + j).attr('checked', false);
        }
        $("#gridHeader" + i).attr('checked', false);
    }
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
    tempStr += "<table class='table reqTable table-condensed'><tr>";
    for (var i = 0; i < facArray.length; i++) {
        tempStr += "<td><input style='display:none' type='checkbox' class='specReq' id='" + facArray[i].id + "' onchange='facilityStore(this)'><label class='btn btn-default' for='" + facArray[i].id + "'>" + facArray[i].name + "</label></td>";
        if (i % 2 != 0) {
            tempStr += "</tr><tr>";
        }
    }

    tempStr += "<tr><td>Number of students: <input class='form-control' type='textbox' id='CAP' onchange='infoStore()' onclick='infoStore()' value='0'></td>";
    tempStr += "<td>Other requirements: <input class='form-control' type='textbox' onchange='infoStore()' onclick='infoStore()' id='ORE'></td></tr>";
    tempStr += "<tr><td>Park: <select class='form-control' id='PRK' onchange='infoStore()' onclick='infoStore()'>";
    for (var j = 0; j < parksArray.length; j++) {
        tempStr += "<option value='" + parksArray[j] + "'>" + parksArray[j] + "</option>";
    }
    tempStr += "<td>Room type: <select class='form-control' id='RMT' onchange='infoStore()' onclick='infoStore()'>";
    for (var k = 0; k < sessionTypesArray.length; k++) {
        tempStr += "<option value='" + sessionTypesArray[k] + "'>" + sessionTypesArray[k] + "</option>";
    }
    tempStr += "</select>Room number: <select class='form-control' id='NOR' onchange='infoStore()' onclick='infoStore()'><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option></select></td></tr>"; //FIXME dynamic # of rooms?    

    tempStr += "<tr><td>Priority: <input style='display:none' type='radio' id='PRT' name='priority' value='true' onchange='infoStore()' onclick='infoStore()'><label for='PRT' class='btn btn-default'>yes</label><input style='display:none' type='radio' checked='checked' id='PRF' name='priority' value='false' onchange='infoStore()' onclick='infoStore()'><label for='PRF' class='btn btn-default'>no</label></td>";
    tempStr += "<td>Type:<input style='display:none' type='radio' id='TRD' name='type' checked='checked' value='true' onchange='infoStore()' onclick='infoStore()'><label for='TRD' class='btn btn-default'>traditional</label><input style='display:none' type='radio' id='SMR' name='type' value='false' onchange='infoStore()' onclick='infoStore()'><label for='SMR' class='btn btn-default'>seminar</label></td></tr>";
    tempStr += "</select></td></tr></table>";
    $("#propertiesBox").append(tempStr);
}

//creates building filter dropdown
function buildingPopulate() {
    var existSizedRoom = false;
    var tempStr = "Building filter: <select class='form-control' id='buildingSelect' onchange='roomListPopulate()'><option id='buildingRadioAll' value='-1'>All buildings</option>";
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
                var rType = false;

                for (var k = 0; k < newRequest.facilities.length; k++) {
                    if (chosenBuilding.rooms[i].facilities.indexOf(newRequest.facilities[k]) == -1) facAvail = false;
                }
                if (chosenBuilding.rooms[i].type == newRequest.sessionType) {
                    rType = true;
                }
                if ((chosenBuilding.rooms[i].capacity >= newRequest.students) && (facAvail) && (rType)) tempStr += "<input style='display:none' type='checkbox' class='roomList' id='" + chosenBuilding.rooms[i].code + "' value='" + chosenBuilding.rooms[i].code.split('.').join("") + "' onchange='checkedRoomList(this)' data-counter='room-" + i + "' data-cap='" + chosenBuilding.rooms[i].capacity + "'><label for='" + chosenBuilding.rooms[i].code + "' class='btn btn-default'></label>" + chosenBuilding.rooms[i].code.split('.').join("") + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
            }
        }
        //all buildings, specific park
    } else if (buildNum == -1) {

        for (var j = 0; j < buildArray.length; j++) {

            var chosenBuilding = buildArray[j];

            for (var i = 0; i < chosenBuilding.rooms.length; i++) {
                var facAvail = true;
                var rType = false;

                for (var k = 0; k < newRequest.facilities.length; k++) {
                    if (chosenBuilding.rooms[i].facilities.indexOf(newRequest.facilities[k]) == -1) facAvail = false;
                }
                if (chosenBuilding.rooms[i].type == newRequest.sessionType) {
                    rType = true;
                }
                if ((chosenBuilding.rooms[i].capacity >= newRequest.students) && (chosenBuilding.park == newRequest.park) && (facAvail) && (rType)) tempStr += "<input style='display:none' type='checkbox' id='" + chosenBuilding.rooms[i].code + "' value='" + chosenBuilding.rooms[i].code.split('.').join("") + "' class='roomList' onchange='checkedRoomList(this)' data-counter='room-" + i + "' data-cap='" + chosenBuilding.rooms[i].capacity + "'><label for='" + chosenBuilding.rooms[i].code + "' class='btn btn-default'></label>" + chosenBuilding.rooms[i].code.split('.').join("") + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
            }
        }
        //specific building
    } else {

        var chosenBuilding = buildArray[buildNum];

        for (var i = 0; i < chosenBuilding.rooms.length; i++) {
            var facAvail = true;
            var rType = false;

            for (var k = 0; k < newRequest.facilities.length; k++) {
                if (chosenBuilding.rooms[i].facilities.indexOf(newRequest.facilities[k]) == -1) facAvail = false;
            }
            if (chosenBuilding.rooms[i].type == newRequest.sessionType) {
                rType = true;
            }

            if ((chosenBuilding.rooms[i].capacity >= newRequest.students) && (facAvail == true) && (rType)) tempStr += "<input style='display:none' type='checkbox' id='" + chosenBuilding.rooms[i].code + "' value='" + chosenBuilding.rooms[i].code.split('.').join("") + "' class='roomList' onchange='checkedRoomList(this)' data-counter='room-" + i + "' data-cap='" + chosenBuilding.rooms[i].capacity + "'><label for='" + chosenBuilding.rooms[i].code + "' class='btn btn-default'></label>" + chosenBuilding.rooms[i].code.split('.').join("") + " (capacity: " + chosenBuilding.rooms[i].capacity + ")<br>";
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
    disableBookedTimes();
    tempStr = "";
    pushID = checkbox.id;
    if ($(checkbox).is(":checked")) {

        tempStr += "<div id='divPicked-" +
            checkbox.id.split('.').join("") +
            "'><input style='display:none' type='checkbox' checked='true' id='picked-" +
            checkbox.id + "' value ='" + checkbox.id + "' data-cap='" +
            $(checkbox).attr('data-cap') + "' onclick='removeCheckedRoom(this)'><label for='picked-" +
            checkbox.id + "' class='btn btn-default'></label>" +
            checkbox.id.split('.').join("") + " (capacity: " + $(checkbox).attr('data-cap') + ")</input></div>";

        $('#chosenRoomsList').append(tempStr);
        newRequest.rooms.push(pushID);
    } else if ($(checkbox).is(":not(:checked)")) {
        newRequest.rooms.splice(newRequest.rooms.indexOf(pushID), 1);
        $("#divPicked-" + checkbox.id.split('.').join("")).remove();
    }
}

function disableBookedTimes() {

}

//stores all the non-facility requirements in the request object
function infoStore() {
    var tempStudents = $("#CAP").val();
    tempStudents = tempStudents.replace(/[^0-9]/g, '');
    newRequest.students = parseInt(tempStudents, 10);
    newRequest.park = $('#PRK').get(0).selectedIndex;
    newRequest.sessionType = $('#RMT').get(0).selectedIndex;
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
    $('#TRD').change(function () {
        newRequest.traditional = true;
        $("#RMT option[value='Lab']").attr("disabled", false);
        $("#RMT option[value='Tutorial']").attr("disabled", false);
    });
    $('#SMR').change(function () {
        newRequest.traditional = false;
        $('#RMT').val("Lecture");
        $("#RMT option[value='Lab']").attr("disabled", true);
        $("#RMT option[value='Tutorial']").attr("disabled", true);
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
    if (validateForm()) {
        //Set up 2D array
        var timeDayArray = [];
        while (timeDayArray.push([]) < daysArray.length);

        //read all checkboxes and push ticked ones into a 2D array
        for (var i = 0; i < daysArray.length; i++) for (var j = 0; j < periodsArray.length; j++) if ($("#gridCheck-" + i + j).prop('checked')) timeDayArray[i].push(j);

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
    } else {
        alert("You have not filled in all mandatory fields. These include number of students, weeks and time or day.");
    }
}

//check the user has selected the minimum requirements to save a request
function validateForm() {
    var filledIn = false;
    var studentsBool = false;
    var weeksBool = false;
    var dayBool = false;
    //num of students
    if (newRequest.students > 0) {
        studentsBool = true;
    }
    //weeks
    for (var i = 0; i < newRequest.weeks.length; i++) {
        if (newRequest.weeks[i] == true) {
            weeksBool = true;
        }
    }
    //day/time
    for (var i = 0; i < daysArray.length; i++) {
        for (var j = 0; j < periodsArray.length; j++) {
            if ($("#gridCheck-" + i + j).prop('checked') == true) {
                dayBool = true;
            }
        }
    }
    //if all three are true, set return to true
    if ((studentsBool == true) && (weeksBool == true) && (dayBool == true)) {
        filledIn = true;
    }
    return (filledIn);
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
        for (var j = 12; j < numberOfWeeks; j++) {
            $('#weekChoice' + j).prop('checked', false);
        }
    } else if (weeksChosen == "-2") {
        for (var i = 0; i < regularWeeks; i++) {
            if (i % 2 != 0) {
                $('#weekChoice' + i).prop('checked', true);
            } else {
                $('#weekChoice' + i).prop('checked', false);
            }
        }
        for (var j = 12; j < numberOfWeeks; j++) {
            $('#weekChoice' + j).prop('checked', false);
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
    $('.roomList:input:checkbox:checked').each(function () {
        $(this).click();
    });
}

function clearChosenRoomSel() {
    $('#roomList input:checkbox').attr('checked', false);
    $('#chosenRoomsList').empty();
    newRequest.rooms = [];
}

//remove checked item when unticked
function removeCheckedRoom(checkbox) {
    $($(checkbox).parent()).remove();
    $(":checkbox[value=" + $(checkbox).val().split('.').join('') + "]").prop("checked", false);
}

//loads in request details for duplicate or edit option
function loadInRequest() {
    newRequest = temporaryRequestStore;
    for (var k = 0; k < newRequest.facilities.length; k++) {
        $("#" + newRequest.facilities[k]).attr('checked', true);
    }
    $("#modCodeSelect").val(newRequest.module.code);
    $("#modTitleSelect").val(newRequest.module.title);
    $("#CAP").val(newRequest.students);
    for (var i = 0; i < newRequest.weeks.length; i++) {
        if (newRequest.weeks[i] == true) {
            $("#weekChoice" + i).prop("checked", true)
        } else {
            $("#weekChoice" + i).prop("checked", false)
        }
    }
    $("#ORE").val(newRequest.otherReqs);
    $('#PRK').prop('selectedIndex', newRequest.park);
    if (editRequestFlag == true) {
        $("#submitForm").val("update request");
        $("#NOR").val(newRequest.noOfRooms);
        if (newRequest.priority == true) {
            $('#PRT').attr('checked', true);
        } else {
            $('#PRF').attr('checked', true);
        }
        if (newRequest.traditional == true) {
            $('#TRD').attr('checked', true);
        } else {
            $('#SMR').attr('checked', true);
        }
        $('#RMT').prop('selectedIndex', newRequest.sessionType);
        infoStore();
        for (var j = 0; j < newRequest.rooms.length; j++) {
            tempName = newRequest.rooms[0].split('.').join('');
            newRequest.rooms.splice(0, 1);
            $(":checkbox[value=" + tempName + "]").click();
        }
    }
    if (editAdHocFlag == true) {
        $("#adhoc").attr("checked", true);
        $("#adhoc").attr("disabled", true);
    }
    duplicateRequestFlag = false;
    editRequestFlag = false;
    editAdHocFlag = false;
    temporaryRequestStore = null;
}
