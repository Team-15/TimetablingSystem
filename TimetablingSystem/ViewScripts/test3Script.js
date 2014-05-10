$(document).ready(function () {
    
    
    // Fix work column on scroll
    /*
    contentStart = $("#listContainer").offset().top;
    contentSize = $("#listContainer").height();

    window.onscroll = (function () {

        if (window.XMLHttpRequest) {
            var position = window.pageYOffset;

            var elemTop = $(".requestContainerList").offset().top;

            if (position >= (elemTop - 60)) {

                $(".headerContainer").css({
                    "position": "fixed",
                    "top": "0",
                    "left": "50%",
                    "margin-left": "-469px",
                    "height": "50px"
                });

            }
            else {
                $(".headerContainer").css({
                    "position": "relative",
                    "top": "initial",
                    "left": "auto",
                    "margin-left": "0px",
                    "height": "50px"
                });
            }
        }

    });

    */

    requestsSet = [];


    requestsSet = testRequestList();

    addAdHocRequest(setupDBRequestModel(requestsSet[0]));

    //listViewGenerator2(requestsSet);

});

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


function listViewGenerator2(requestsArray) {

    var listHTML = "";

    listHTML += "<div class='requestContainerList'>";

    for (var rCounter = 0; rCounter < requestsArray.length; rCounter++) {

        listHTML += "<label class='checkboxLabel'><input type='checkbox' class='requestCheckbox' />";

        listHTML += "<div class='requestContainer' id='request" + requestsArray[rCounter].id + "'>";

        listHTML += "<div class='requestHeader'>";

        listHTML += "<table class='mainTable'>\
                    <tr>\
                        <td style='width: 80px;' class='idData'></td>\
                        <td style='width: 95px;' class='deptData'></td>\
                        <td style='width: 90px;' class='mcData'></td>\
                        <td style='width: 50px;' class='prData'></td>\
                        <td style='width: 90px;' class='dayData'></td>\
                        <td style='width: 60px;' class='periodData'></td>\
                        <td style='width: 65px;' class='lengthData'></td>\
                        <td style='width: 200px;' class='weeksData'></td>\
                    </tr>\
                </table>";

        listHTML += "<table class='btnTable'>\
                     <tr>\
                        <td class='requestBtn' style='width: 30px;'><input type='button' name='Edit' value='edit' /></td>\
                        <td class='requestBtn' style='width: 30px;'><input type='button' name='Duplicate' value='duplicate' /></td>\
                        <td class='requestBtn' style='width: 30px;'><input type='button' name='Delete' value='delete' /></td>\
                    </tr>\
                </table>";

        listHTML += "</div>";

        listHTML += "<div class='requestDetails'>";

        listHTML += "<table class='detailsTable'>";

        listHTML += "<tr>\
                    <td class='hiddenTD'></td>\
                    <td class='hiddenTD'></td>\
                    <td class='hiddenTD'></td>\
                    <td class='hiddenTD'></td>\
                    <td class='hiddenTD'></td>\
                    <td class='hiddenTD'></td>\
                    <td class='hiddenTD'></td>\
                    <td class='hiddenTD'></td>\
                </tr>";

        listHTML += "<tr>\
                    <td class='titleTD' colspan='2'>Module Title:</td>\
                    <td colspan='6' class='mtData'></td>\
                </tr>";

        listHTML += "<tr>\
                    <td class='titleTD' colspan='2'>Allocated Rooms</td>\
                    <td colspan='6' class='raData'></td>\
                </tr>";

        listHTML += "<tr>\
                    <td class='titleTD' colspan='2'>Room Preferences:</td>\
                    <td colspan='6' class='rpData'></td>\
                </tr>";

        listHTML += "<tr>\
                    <td class='titleTD'>Status:</td>\
                    <td class='statusData'></td>\
                    <td class='titleTD' colspan='2'>Number of Students:</td>\
                    <td class='nosData'></td>\
                    <td class='titleTD' colspan='2'>Number of Rooms:</td>\
                    <td class='norData'></td>\
                </tr>";

        listHTML += "<tr>\
                    <td class='titleTD' colspan='1'>Park:</td>\
                    <td class='parkData'></td>\
                    <td class='titleTD' colspan='2'>Traditional:</td>\
                    <td class='traditionalData'></td>\
                    <td class='titleTD' colspan='2'>Session Type:</td>\
                    <td class='stData'></td>\
                </tr>";

        listHTML += "<tr>\
                    <td class='titleTD' colspan='3'>Facilities:</td>\
                    <td class='titleTD' colspan='5'>Other Requirements:</td>\
                </tr>";

        listHTML += "<tr>\
                    <td colspan='3'><div class='scrollableDetail facData'></div></td>\
                    <td colspan='5'><div class='scrollableDetail orData'></div></td>\
                </tr>";

        listHTML += "</table>";

        listHTML += "</div>";

        listHTML += "</div></label>";

    }
    
    listHTML += "</div>";

    $("#listContainer").append(listHTML);
    listDetailsGenerator2(requestsArray);

}

function listDetailsGenerator2(requestsArray) {
   
    for (var rCounter = 0; rCounter < requestsArray.length; rCounter++) {

        var currentReq = requestsArray[rCounter];

        document.getElementById("request" + currentReq.id).querySelector(".idData").innerHTML = currentReq.id;
        document.getElementById("request" + currentReq.id).querySelector(".deptData").innerHTML = currentReq.module.deptCode;
        document.getElementById("request" + currentReq.id).querySelector(".mcData").innerHTML = currentReq.module.code;
        document.getElementById("request" + currentReq.id).querySelector(".prData").innerHTML = (currentReq.priority ? "Yes" : "No");
        document.getElementById("request" + currentReq.id).querySelector(".dayData").innerHTML = shortDaysArray[currentReq.day];
        document.getElementById("request" + currentReq.id).querySelector(".periodData").innerHTML = periodsArray[currentReq.startPeriod];
        document.getElementById("request" + currentReq.id).querySelector(".lengthData").innerHTML = currentReq.endPeriod - currentReq.endPeriod + 1;
        document.getElementById("request" + currentReq.id).querySelector(".weeksData").innerHTML = weeksReadableFormat(currentReq.weeks);
        document.getElementById("request" + currentReq.id).querySelector(".mtData").innerHTML = currentReq.module.title;
        document.getElementById("request" + currentReq.id).querySelector(".raData").innerHTML = htmlStringFormater(currentReq.allocatedRooms, false);
        document.getElementById("request" + currentReq.id).querySelector(".rpData").innerHTML = htmlStringFormater(currentReq.rooms, false);
        document.getElementById("request" + currentReq.id).querySelector(".statusData").innerHTML = (currentReq.status == null ? "Unsubmitted" : statusArray[currentReq.status]);
        document.getElementById("request" + currentReq.id).querySelector(".nosData").innerHTML = currentReq.students;
        document.getElementById("request" + currentReq.id).querySelector(".norData").innerHTML = currentReq.noOfRooms;
        document.getElementById("request" + currentReq.id).querySelector(".parkData").innerHTML = parksArray[currentReq.park];
        document.getElementById("request" + currentReq.id).querySelector(".traditionalData").innerHTML = (currentReq.traditional ? "Traditional" : "Seminar");
        document.getElementById("request" + currentReq.id).querySelector(".stData").innerHTML = sessionTypesArray[currentReq.sessionType];
        document.getElementById("request" + currentReq.id).querySelector(".facData").innerHTML = htmlStringFormater(getFacilityTitles(currentReq.facilities), true);
        document.getElementById("request" + currentReq.id).querySelector(".orData").innerHTML = currentReq.otherReqs;

    }

}





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
            alert("Added Called");
            alert(results);
        },
        error: function (results) {
            alert(JSON.stringify(results));
        },
        url: "api/request/PostNewRequest",
        processData: false
    });

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

    testReq.round = roundID;

    testReq.id = "1234";
    testReq.module = module1;

    testReq.priority = true;

    testReq.day = 2;
    testReq.startPeriod = 2;
    testReq.endPeriod = 3;
    testReq.weeks = [true, true, true, true, true, true, true, true, true, true, true, true, false, false, false];

    testReq.students = 100;
    testReq.park = 2;
    testReq.traditional = true;
    testReq.sessionType = 0;
    testReq.noOfRooms = 1;
    testReq.rooms = ["J.0.01", "J.0.02"];

    testReq.status = null;

    testReq.facilities = [1, 2];
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

    testReq2.facilities = [1, 4, 10];
    testReq2.otherReqs = "Some requirement";

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