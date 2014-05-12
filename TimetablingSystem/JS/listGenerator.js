function generateListDisplay() {

    listViewGenerator(requestsSet);
    toggleTimeValue(true);
    setupHeaderScroll(true);
    

}

function listViewGenerator(requestsArray) {

    var listHTML = "";

    listHTML += "<div class='headerContainer'><table class='headerTable'><tr>\
                    <td style='width: 80px;'>ID</td>\
                    <td style='width: 95px;'>Department</td>\
                    <td style='width: 90px;'>Module</td>\
                    <td style='width: 50px;'>P</td>\
                    <td style='width: 90px;'>Day</td>\
                    <td style='width: 60px;'>Period</td>\
                    <td style='width: 65px;'>Length</td>\
                    <td style='width: 200px;'>Weeks</td>\
                </tr></table></div>";

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

        listHTML += "<table class='btnTable' onclick='return false;'>\
                     <tr>\
                        <td class='requestBtn' style='width: 30px;'><input type='button' name='Edit' class='listEditBtn' data-rID='" + requestsArray[rCounter].id + "' value='edit' /></td>\
                        <td class='requestBtn' style='width: 30px;'><input type='button' name='Duplicate' class='listDuplicateBtn' data-rID='" + requestsArray[rCounter].id + "' value='duplicate' /></td>\
                        <td class='requestBtn' style='width: 30px;'><input type='button' name='Delete' class='listDeleteBtn' data-rID='" + requestsArray[rCounter].id + "' value='delete' /></td>\
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

    $("#listContainer").html(listHTML);
    listDetailsGenerator(requestsArray);

}

function listDetailsGenerator(requestsArray) {

    for (var rCounter = 0; rCounter < requestsArray.length; rCounter++) {

        var currentReq = requestsArray[rCounter];

        document.getElementById("request" + currentReq.id).querySelector(".idData").innerHTML = currentReq.id;
        document.getElementById("request" + currentReq.id).querySelector(".deptData").innerHTML = currentReq.module.deptCode;
        document.getElementById("request" + currentReq.id).querySelector(".mcData").innerHTML = currentReq.module.code;
        document.getElementById("request" + currentReq.id).querySelector(".prData").innerHTML = (currentReq.priority ? "Yes" : "No");
        document.getElementById("request" + currentReq.id).querySelector(".dayData").innerHTML = shortDaysArray[currentReq.day];
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

    $(".listEditBtn").click(function () {
        if (typeof currentViewFlag !== "undefined") if (!currentViewFlag) editAdHocFlag = true;
        editTransfer(listRequestFinder($(this).attr("data-rID")));
    });
    $(".listDuplicateBtn").click(function () { duplicateTransfer(listRequestFinder($(this).attr("data-rID"))); });
    $(".listDeleteBtn").click(function () {
        deleteExecute(listRequestFinder($(this).attr("data-rID")));
        refreshLoad();
        displayReloader();
    });

    listBtnMode();
}

function toggleTimeValue(time) {

    for (var rCounter = 0; rCounter < requestsSet.length; rCounter++) {
        
        var currentReq = requestsSet[rCounter];

        if (time) document.getElementById("request" + currentReq.id).querySelector(".periodData").innerHTML = timeDisplayArray[currentReq.startPeriod];
        else document.getElementById("request" + currentReq.id).querySelector(".periodData").innerHTML = periodsArray[currentReq.startPeriod];

    }

}

function listRequestFinder(idVal) {

    for (var rCounter = 0; rCounter < requestsSet.length; rCounter++) if (requestsSet[rCounter].id === parseInt(idVal)) return requestsSet[rCounter];
        
}

function setupHeaderScroll(scrollSwitch) {
    
    if (scrollSwitch) {

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

    }
    else {
        window.onscroll = null;
    }

    

}

function listBtnMode() {

    if (!editEnabled) $(".listEditBtn").prop("disabled", true);
    else $(".listEditBtn").prop("disabled", false);
    
    if (!duplicateEnabled) $(".listDuplicateBtn").prop("disabled", true);
    else $(".listDuplicateBtn").prop("disabled", false);

    if (!deleteEnabled) $(".listDeleteBtn").prop("disabled", true);
    else $(".listDeleteBtn").prop("disabled", false);

}