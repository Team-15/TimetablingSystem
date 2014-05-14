$(document).ready(function () {

    raCurrentFlag = true;

    raWeeksSelected = [];
    while (raWeeksSelected.push(false) < numberOfWeeks);

    raSelectedRoom = null;

    buildWithRms = buildingsWithRooms;

    generateRoomsList();
    generateWeeksCheckboxes();
    roomsAvailGenerator();


    $("input[name = requestTypeRadio]").change(function () {

        if ($(this).val() === "current") raCurrentFlag = true;
        else raCurrentFlag = false;

        setupAvailGrid();

    });

    $("input[name=weeks]").change(function () {

        var indexVal = $(this).attr("data-week") - 1;

        if ($(this).is(":checked")) raWeeksSelected[indexVal] = true;
        else raWeeksSelected[indexVal] = false;

        setupAvailGrid();

    });

    $("#raselectroom").change(function () {

        var tempRmStore = $(this).val();

        if (tempRmStore !== "select") raSelectedRoom = tempRmStore;
        else raSelectedRoom = null;

        setupAvailGrid();

    });

});

function roomsAvailGenerator() {

    var roomsAvailHTML = "";

    roomsAvailHTML += "<div class='raDaySection' style='border-color:transparent; margin-bottom:10px;' >";

    roomsAvailHTML += "<div class='raDayTitle' style='border-color:transparent;' ></div>";

    roomsAvailHTML += "<table class='raDayTable'><tr id='timeHeader'>";

    for (var periodCounter = 0; periodCounter < periodsArray.length; periodCounter++) {

        roomsAvailHTML += "<td>Period: " + periodsArray[periodCounter] + "<br />Time: " + timeDisplayArray[periodCounter] + "</td>";

    }

    roomsAvailHTML += "</tr></table></div>";


    for (var dayCounter = 0; dayCounter < shortDaysArray.length; dayCounter++) {

        roomsAvailHTML += "<div class='raDaySection'>";

        roomsAvailHTML += "<div class='raDayTitle'>" + shortDaysArray[dayCounter] + "</div>";

        roomsAvailHTML += "<table class='raDayTable'>";

        roomsAvailHTML += "<tr>";

        for (var hiddenCounter = 0; hiddenCounter < periodsArray.length; hiddenCounter++) roomsAvailHTML += "<td id='hiddenTD" + hiddenCounter + "'></td>";

        roomsAvailHTML += "</tr>";

        roomsAvailHTML += "<tr>";

        for (var periodCounter = 0; periodCounter < periodsArray.length; periodCounter++) roomsAvailHTML += "<td id='" + dayCounter + "-" + periodCounter + "' value ='" + dayCounter + "-" + periodCounter + "'></td>";

        roomsAvailHTML += "</tr>";


        roomsAvailHTML += "</table>";

        roomsAvailHTML += "</div>";

    }

    $("#roomsAvailContainer").html(roomsAvailHTML);

}

function generateWeeksCheckboxes() {

    var cbHTML = "";

    for (var wCounter = 1; wCounter <= numberOfWeeks; wCounter++) {

        cbHTML += "<input type='checkbox' name='weeks' value='week" + wCounter + "' id='week" + wCounter + "' data-week=" + wCounter + " /><label for='week" + wCounter + "' class='btn raBtns'>" + wCounter + "</label>";

    }

    $("#weeksContainer").html(cbHTML);

}

function generateRoomsList() {

    var rlHTML = "";

    rlHTML += '<select id="raselectroom">'
    rlHTML += '<option value="select">' + "Select" + '</option>';

    for (var bCounter = 0; bCounter < buildWithRms.length; bCounter++) {

        var currentBuild = buildWithRms[bCounter];

        for (var rCounter = 0; rCounter < currentBuild.rooms.length; rCounter++) {

            var currentRm = currentBuild.rooms[rCounter];

            rlHTML += "<option value='" + currentRm.code + "'>" + currentRm.code + "</option>";


        }

    }

    rlHTML += '</select>';

    $("#roomsListContainer").html(rlHTML);

}

function setupAvailGrid() {

    var hasWeek = false;

    for (var wCounter = 0; wCounter < raWeeksSelected.length; wCounter++) if (raWeeksSelected[wCounter]) hasWeek = true;

    if ((raSelectedRoom !== null) && hasWeek) {

        var unavailableTimes = availabilityFilter([raSelectedRoom], raWeeksSelected, raCurrentFlag);

        loadRAData(unavailableTimes);

    }
    else {

        for (var dCounter = 0; dCounter < shortDaysArray.length; dCounter++) {

            for (var pCounter = 0; pCounter < periodsArray.length; pCounter++) {

                $("#" + dCounter + "-" + pCounter).removeClass("bookedSlot availableSlot");
                $("#" + dCounter + "-" + pCounter).html("");
                $("#" + dCounter + "-" + pCounter).unbind("click");
            }

        }

    }

}

function loadRAData(bookedTimes) {

    for (var dCounter = 0; dCounter < shortDaysArray.length; dCounter++) {

        for (var pCounter = 0; pCounter < periodsArray.length; pCounter++) {

            $("#" + dCounter + "-" + pCounter).addClass("availableSlot");

        }

    }

    for (var btCounter = 0; btCounter < bookedTimes.length; btCounter++) {

        var dayBooked = bookedTimes[btCounter].day;

        var bookedStart = bookedTimes[btCounter].start;

        var bookedEnd = bookedTimes[btCounter].end + 1;

        for (var p = bookedStart; p < bookedEnd; p++) {

            $("#" + dayBooked + "-" + p).removeClass("availableSlot");
            $("#" + dayBooked + "-" + p).addClass("bookedSlot");
            $("#" + dayBooked + "-" + p).html("Booked");

        }


    }

    $(".availableSlot").click(function () {

        var clickedID = $(this).attr("id");

        var splitVals = clickedID.split("-");

        var selectedRADay = parseInt(splitVals[0]);

        var selectedRAPeriod = parseInt(splitVals[1]);

        var confirmationClick = confirm("Create request for " + daysArray[selectedRADay] + ", Period: " + periodsArray[selectedRAPeriod]);

        if (confirmationClick) {

            roomAvailabilityFlag = true;

            roomAvailabilityData = {

                day: selectedRADay,
                start: selectedRAPeriod,
                weeks: raWeeksSelected,
                adhoc: !raCurrentFlag,
                roomCode: raSelectedRoom

            };

            $("#addPageBtn").click();
        }
        else return false;

    });

}