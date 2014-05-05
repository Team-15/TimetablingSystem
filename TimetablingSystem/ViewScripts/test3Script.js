$(document).ready(function () {
    
    rArray = [];
    fArray = [];


    rArray = testRequestList();
    fArray = testFacilities();

    layoutSetup();
    detailsGenerator();
    graphicalGenerator(rArray);

    $("input[name=gRadio]").click(function () {

        rArray = testRequestList();
        var r = null;
        for (var i = 0; i < rArray.length; i++) if (rArray[i].id === $(this).val()) r = rArray[i];
        displayData(r);

    });

});
 

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

}

function layoutSetup() {

    var layoutHTML = "";

    layoutHTML += "<div id='infoSection'></div>";
    layoutHTML += "<div id='graphicalSection'></div>";

    $("#graphicalContainer").html(layoutHTML);

}

function detailsGenerator() {

    var detailsHTML = "";

    detailsHTML += "<div id='detailsContainer'>";

    detailsHTML += "<div class='dataRow' style='background: lightblue;'>\
                        <div class='dataTitle'>Department:</div>\
                        <div class='dataContent' id='deptCode'></div>\
                        <div class='dataTitle'>ID:</div>\
                        <div class='dataContent' id='id'></div>\
                    </div>";


    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Code:</div>\
                        <div class='dataContent' id='modCode'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Title:</div>\
                        <div class='dataContent' id='modTitle'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: lightblue;'>\
                        <div class='dataTitle'>P:</div>\
                        <div class='dataContent' id='priority'></div>\
                        <div class='dataTitle'>Status:</div>\
                        <div class='dataContent' id='status'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Allocated<br />Room(s):</div>\
                        <div class='dataContent' id='roomsAlloc'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Room<br />Preference(s):</div>\
                        <div class='dataContent' id='roomsPref'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Weeks:</div>\
                        <div class='dataContent' id='weeks'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Number of Students:</div>\
                        <div class='dataContent' id='noOfStudents'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Number of Rooms:</div>\
                        <div class='dataContent' id='noOfRooms'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: lightblue;'>\
                        <div class='dataTitle'>Tradional:</div>\
                        <div class='dataContent' id='traditional'></div>\
                        <div class='dataTitle'>Park:</div>\
                        <div class='dataContent' id='park'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Session Type:</div>\
                        <div class='dataContent' id='sessionType'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Other<br />Requirements:</div>\
                        <div class='dataContent' id='otherRequirements'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataTitle'>Facilities:</div>\
                        <div class='dataContent' id='facilities'></div>\
                    </div>";

    detailsHTML += "<div class='dataRow' style='background: linen;'>\
                        <div class='dataBtn'> <input type='button' name='Edit' value='Edit' data-requestid='' /> </div>\
                        <div class='dataBtn'> <input type='button' name='Duplicate' value='Duplicate' data-requestid='' /> </div>\
                        <div class='dataBtn'> <input type='button' name='Delete' value='Delete' data-requestid='' /> </div>\
                    </div>";


    detailsHTML += "</div>";

    $("#infoSection").html(detailsHTML);

}

function graphicalGenerator(requestsArray) {
    
    var graphicalHTML = "";

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

                    graphicalHTML += "<td colspan='" + (periodShift+1) + "' >";
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

}

function getDayRequests(reqArray, day) {

    var dayRequests = [];
    while (dayRequests.push([]) < periodsArray.length);

    for (var reqCounter = 0; reqCounter < reqArray.length; reqCounter++) if (reqArray[reqCounter].day == day) dayRequests[reqArray[reqCounter].startPeriod].push(reqArray[reqCounter]);

    return dayRequests;

}



function testFacilities() {

    var facility1 = new Facility();
    facility1.id = "10100";
    facility1.name = "Whiteboard";

    var facility2 = new Facility();
    facility2.id = "10101";
    facility2.name = "Data Projector";

    var facility3 = new Facility();
    facility3.id = "10102";
    facility3.name = "OHP";

    return [facility1, facility2, facility3];

}

function testRequestList() {

    var testReq = new Request();
    var testReq2 = new Request();
    var testReq3 = new Request();
    var testReq4 = new Request();
    var testReq5 = new Request();

    var module1 = new Module();
    module1.code = "COA123";
    module1.deptCode = "CO";
    module1.title = "Server Side Programming";

    var module2 = new Module();
    module2.code = "COB290";
    module2.deptCode = "CO";
    module2.title = "Team Projects";

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

    testReq2.students = 105;
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

    testReq3.facilities = [1, 2, 4, 8];
    testReq3.otherReqs = "Deaf Student: Sign Linguist Required";

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

    testReq4.students = 50;
    testReq4.park = 0;
    testReq4.traditional = true;
    testReq4.sessionType = 2;
    testReq4.noOfRooms = 1;
    testReq4.rooms = ["N.0.01", "N.0.03"];

    testReq4.status = 1;

    testReq4.facilities = ["10102"];
    testReq4.otherReqs = "";

    testReq4.allocatedRooms = ["N.0.02"];

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
    testReq5.traditional = false;
    testReq5.sessionType = 2;
    testReq5.noOfRooms = 1;
    testReq5.rooms = ["N.0.01", "N.0.03"];

    testReq5.status = 1;

    testReq5.facilities = ["10102"];
    testReq5.otherReqs = "";

    testReq5.allocatedRooms = ["N.0.02"];


    return [testReq, testReq2, testReq3, testReq4, testReq5];

}