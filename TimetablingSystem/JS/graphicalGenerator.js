﻿$(document).ready(function () {

    defaultColours = {
        header: "defaultHeader",
        detail: "defaultDetails",
        cell: "defaultCell",
        btn: "defaultBtn"
    };

    pendingColours = {
        header: "pendingHeader",
        detail: "pendingDetails",
        cell: "pendingCell",
        btn: "pendingBtn"
    };

    allocatedColours = {
        header: "allocatedHeader",
        detail: "allocatedDetails",
        cell: "allocatedCell",
        btn: "allocatedBtn"
    };

    alternativeColours = {
        header: "alternativeHeader",
        detail: "alternativeDetails",
        cell: "alternativeCell",
        btn: "alternativeBtn"
    };

    rejectedColours = {
        header: "rejectedHeader",
        detail: "rejectedDetails",
        cell: "rejectedCell",
        btn: "rejectedBtn"
    };


});

function generateGraphicalDisplay() {

    layoutSetup();
    graphicalDetailsGenerator();
    graphicalViewGenerator(requestsSet);
    toggleTimeHeader(true);

}

function layoutSetup() {

    var layoutHTML = "";

    layoutHTML += "<div id='infoSection'></div>";
    layoutHTML += "<div id='graphicalSection'></div>";

    $("#graphicalContainer").html(layoutHTML);

}

function graphicalDetailsGenerator() {

    var detailsHTML = "";

    detailsHTML += "<div id='detailsContainer'>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Department:</div>\
                        <div class='dataContent' id='deptCode'></div>\
                        <div class='dataTitle'>ID:</div>\
                        <div class='dataContent' id='id'></div>\
                    </div>";


    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Code:</div>\
                        <div class='dataContent' id='modCode'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Title:</div>\
                        <div class='dataContent' id='modTitle'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>P:</div>\
                        <div class='dataContent' id='priority'></div>\
                        <div class='dataTitle'>Status:</div>\
                        <div class='dataContent' id='status'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Allocated<br />Room(s):</div>\
                        <div class='dataContent' id='roomsAlloc'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Room<br />Preference(s):</div>\
                        <div class='dataContent' id='roomsPref'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Weeks:</div>\
                        <div class='dataContent' id='weeks'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Number of Students:</div>\
                        <div class='dataContent' id='noOfStudents'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Number of Rooms:</div>\
                        <div class='dataContent' id='noOfRooms'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Traditional:</div>\
                        <div class='dataContent' id='traditional'></div>\
                        <div class='dataTitle'>Park:</div>\
                        <div class='dataContent' id='park'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Session Type:</div>\
                        <div class='dataContent' id='sessionType'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Other<br />Requirements:</div>\
                        <div class='dataContent' id='otherRequirements'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataTitle'>Facilities:</div>\
                        <div class='dataContent' id='facilities'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow'>\
                        <div class='dataBtn'> <input type='button' name='Edit' value='Edit' class='graphicalEditBtn'  data-requestid='' /> </div>\
                        <div class='dataBtn'> <input type='button' name='Duplicate' value='Duplicate' class='graphicalDuplicateBtn' data-requestid='' /> </div>\
                        <div class='dataBtn'> <input type='button' name='Delete' value='Delete' class='graphicalDeleteBtn' data-requestid='' /> </div>\
                    </div>";


    detailsHTML += "</div>";

    $("#infoSection").html(detailsHTML);

    $("#detailsContainer").addClass(defaultColours.header);

}

function graphicalViewGenerator(requestsArray) {

    var graphicalHTML = "";

    graphicalHTML += "<div class='daySection' style='border-color:transparent; margin-bottom:10px;' >";

    graphicalHTML += "<div class='dayTitle' style='border-color:transparent;' ></div>";

    graphicalHTML += "<table class='dayTable'><tr id='timeHeader'>";

    

    graphicalHTML += "</tr></table></div>";


    for (var dayCounter = 0; dayCounter < shortDaysArray.length; dayCounter++) {


        var dayRequests = getDayRequests(requestsArray, dayCounter);


        graphicalHTML += "<div class='daySection'>";

        graphicalHTML += "<div class='dayTitle'>" + shortDaysArray[dayCounter] + "</div>";

        graphicalHTML += "<table class='dayTable'>";

        graphicalHTML += "<tr>";

        for (var hiddenCounter = 0; hiddenCounter < periodsArray.length; hiddenCounter++) graphicalHTML += "<td id='hiddenTD" + hiddenCounter + "'></td>";

        graphicalHTML += "</tr>";



        var rowsNeeded = null;

        do {

            rowsNeeded = false;


            graphicalHTML += "<tr>";

            for (var periodCounter = 0; periodCounter < periodsArray.length; periodCounter++) {

                if (dayRequests[periodCounter].length == 0) graphicalHTML += "<td></td>";
                else {

                    var currentRequest = (dayRequests[periodCounter]).pop();

                    var periodShift = (currentRequest.endPeriod - currentRequest.startPeriod);

                    periodCounter += periodShift;

                    var statusColour;

                    if (currentRequest.status === 0) statusColour = pendingColours;
                    else if (currentRequest.status === 1) statusColour = allocatedColours;
                    else if (currentRequest.status === 2) statusColour = alternativeColours;
                    else if (currentRequest.status === 3) statusColour = rejectedColours;
                    else statusColour = defaultColours;

                    graphicalHTML += "<td colspan='" + (periodShift + 1) + "' class='" + statusColour.cell + "' >";
                    graphicalHTML += "<label class='radioLabel'>";


                    graphicalHTML += "<input type='radio' name='gRadio' value='" + currentRequest.id + "' />" + currentRequest.module.code + "\
                                        </label></td>";

                }

            }

            graphicalHTML += "</tr>";

            for (var drCounter = 0; drCounter < dayRequests.length; drCounter++) if (dayRequests[drCounter].length != 0) rowsNeeded = true;

        } while (rowsNeeded);

        graphicalHTML += "</table>";

        graphicalHTML += "</div>";

    }

    $("#graphicalSection").html(graphicalHTML);

    $("input[name=gRadio]").click(function () {
        
        var request = null;

        for (var i = 0; i < requestsArray.length; i++) if (requestsArray[i].id == $(this).val()) request = requestsArray[i];
        
        displayData(request);

    });

}

function toggleTimeHeader(time) {

    var timeTD = "";

    if (time) for (var periodCounter = 0; periodCounter < timeDisplayArray.length; periodCounter++) timeTD += "<td>" + timeDisplayArray[periodCounter] + "</td>";
    else for (var periodCounter = 0; periodCounter < periodsArray.length; periodCounter++) timeTD += "<td>" + periodsArray[periodCounter] + "</td>";

    $("#timeHeader").html(timeTD);

}

function getDayRequests(reqArray, day) {

    var dayRequests = [];
    while (dayRequests.push([]) < periodsArray.length);

    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) if (reqArray[reqCounter].day == day) dayRequests[reqArray[reqCounter].startPeriod].push(reqArray[reqCounter]);

    return dayRequests;

}

function displayData(request) {

    $("#deptCode").html(request.module.deptCode);
    $("#id").html(request.id);
    $("#modCode").html(request.module.code);
    $("#modTitle").html(request.module.title);
    $("#priority").html(request.priority ? "Yes" : "No");
    $("#status").html(statusArray[request.status]);
    $("#roomsAlloc").html(htmlStringFormater(request.allocatedRooms, false));
    $("#roomsPref").html(htmlStringFormater(request.rooms));
    $("#weeks").html(weeksReadableFormat(request.weeks));
    $("#noOfStudents").html(request.students);
    $("#noOfRooms").html(request.noOfRooms);
    $("#traditional").html(request.traditional ? "T" : "S");
    $("#park").html(parksArray[request.park]);
    $("#sessionType").html(sessionTypesArray[request.sessionType]);
    $("#otherRequirements").html(request.otherReqs);
    $("#facilities").html(htmlStringFormater(getFacilityTitles(request.facilities)));

    $(".graphicalEditBtn").attr("data-requestid", request.id);
    $(".graphicalDuplicateBtn").attr("data-requestid", request.id);
    $(".graphicalDeleteBtn").attr("data-requestid", request.id);

    $(".graphicalEditBtn").unbind("click");
    $(".graphicalDuplicateBtn").unbind("click");
    $(".graphicalDeleteBtn").unbind("click");

    $(".graphicalEditBtn").click(function () {
        if (currentViewFlag !== undefined) if (!currentViewFlag) editAdHocFlag = true;
        editTransfer(graphicalRequestFinder($(this).attr("data-requestid")));
        
    });
    $(".graphicalDuplicateBtn").click(function () { duplicateTransfer(graphicalRequestFinder($(this).attr("data-requestid"))); });
    $(".graphicalDeleteBtn").click(function () {
        deleteExecute(graphicalRequestFinder($(this).attr("data-requestid")));
        refreshLoad();
        displayReloader();
    });


    var statusColour;

    if (request.status === 0) statusColour = pendingColours;
    else if (request.status === 1) statusColour = allocatedColours;
    else if (request.status === 2) statusColour = alternativeColours;
    else if (request.status === 3) statusColour = rejectedColours;
    else statusColour = defaultColours;

    $("#detailsContainer").removeClass("defaultHeader pendingHeader allocatedHeader alternativeHeader rejectedHeader");
    $("#detailsContainer").addClass(statusColour.header);

    $("#detailsContainer input[type=button]").removeClass("defaultBtn pendingBtn allocatedBtn alternativeBtn rejectedBtn");
    $("#detailsContainer input[type=button]").addClass(statusColour.btn);

    graphicalBtnMode();

}

function graphicalRequestFinder(idVal) {

    for (var rCounter = 0; rCounter < requestsSet.length; rCounter++) if (requestsSet[rCounter].id === parseInt(idVal)) return requestsSet[rCounter];

}

function graphicalBtnMode() {

    if (!editEnabled) $(".graphicalEditBtn").prop("disabled", true);
    else $(".graphicalEditBtn").prop("disabled", false);

    if (!duplicateEnabled) $(".graphicalDuplicateBtn").prop("disabled", true);
    else $(".graphicalDuplicateBtn").prop("disabled", false);

    if (!deleteEnabled) $(".graphicalDeleteBtn").prop("disabled", true);
    else $(".graphicalDeleteBtn").prop("disabled", false);

}