$(document).ready(function () {
    createObjects();
    tableCreator();
    modulePopulate();
    facilityPopulate();
});


function createObjects() {
    //dummy modules till we have the db dataaaa
     module1 = new Module();
     module2 = new Module();
     modulesArray = [module1, module2];
     module1.code = "COA123";
     module2.code = "COA124";
     module1.title = "useless module 1";
     module2.title = "boring module 2";
     module1.deptCode = "CO";
     module2.deptCode = "CO";
     module1.active = true;
     module2.active = true;
     //create new request for this instance
     newRequest = new Request();
}

//FIXME finish the rest of these being stored in the facility array
//store user-chosen facilities in request instance
function facilityStore() {

    newRequest.priority = ($("#PRY").selected ? true : false);
    newRequest.noOfRooms = $("#NOR").val;
    newrequest.otherReqs = $("#ORE").val;
    newRequest.students = $("#CAP").val;
    newRequest.students = $("#PRK").val;
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

//creates period grid selector
function tableCreator() {
    var tempStr = "";
    tempStr += "<table class = ''><tr><th>Day</th>";
    for (var h = 0; h < startPeriodsArray.length; h++) {
        tempStr += "<th>" + startPeriodsArray[h] + " - " + endPeriodsArray[h] + "</th>";
    }
    tempStr += "</tr>";
    for (var i = 0; i < 5; i++) {
        tempStr += "<tr> <td onclick='tableSelector(this.id)' id=weekGridHeader" + i + ">" + shortDaysArray[i] + "</td>";
        for (var j = 0; j < 9; j++) {
            tempStr += "<td onclick='tableSelector(this.id)' id=weekGrid" + i + j + ">clickme</td>";
        }
        tempStr += "</tr>";
    }
    tempStr += "</table>";
    $("#weekTable").append(tempStr);
}

//tracks user-selected periods in the period grid
function tableSelector(gridRef) {
    if ($("#" + gridRef).attr('class') != 'gridBooked') {
        if ($("#" + gridRef).attr('class') == 'gridClicked') {
            $("#" + gridRef).removeClass("gridClicked");
            $("#" + gridRef).addClass("grid");
            console.log(gridRef + " disabled");
        } else {
            $("#" + gridRef).removeClass("grid");
            $("#" + gridRef).addClass("gridClicked");
            console.log(gridRef + " enabled");
        }
    }
}

//FIXME convert facilities to be spawned here
function facilityPopulate() {
}
