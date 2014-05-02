﻿//var currentSessionID = "";


var department = "";


var roundID = "";

var roundNumber = 1;

var roundStart = null;

var roundEnd = null;

var liveSemesterID = "";

var liveSemester = 1;

var liveYear = 0;

var numberOfWeeks = null;


var adHocRoundID = "";

var adHocStart = null;

var adHocEnd = null;

var adHocSemesterID = "";

var adHocSemester = 1;

var adHocYear = 0;

var adHocNumberOfWeeks = 1;


var departmentModules = [];

var allDepartmentModules = [];

//Move to script file dealing with all bookings view
//var allModules = [];

var facilitiesArray = [];


//********Temporary Stores for Edit and Duplicate Functionality*****************

var duplicateRequestFlag = false;

var editRequestFlag = false;

var temporaryRequestStore = null;

// *****************************************************************************



function loadModules() {

    $.ajax({
        url: "api/deptmod/GetActiveModules",
        type: "GET",
        datatype: "JSON",
        data: {},
        success: function (results) {
            departmentModules = setupModules(results);
            //alert(JSON.stringify(departmentModules));
        }
    });

    $.ajax({
        url: "api/deptmod/GetDepartmentModules",
        type: "GET",
        datatype: "JSON",
        data: {},
        success: function (results) {
            allDepartmentModules = setupModules(results);
            //alert(JSON.stringify(allDepartmentModules));
        }
    });

}

function setupModules(modulesData) {

    var mArray = [];

    for (var counter = 0; counter < modulesData.length; counter++) {

        var module = new Module();

        module.code = modulesData[counter].code;
        module.title = modulesData[counter].title;
        module.deptCode = modulesData[counter].deptCode;
        module.active = modulesData[counter].active;

        mArray.push(module);

    }

    return mArray;

}



function loadSession() {

    /*
    currentSessionID = document.location.href.match(/PHPSESSID=[^;]+/);

    $.ajax({
        url: "PHP/loadSessionData.php?" + currentSessionID,
        type: "GET",
        datatype: "json",
        async: false,
        data: {},
        success: function (results) {
            sessionDataSetup(results);
        }
    });
    */
}



function sessionDataSetup(sessData) {

    /*

    sessionData = JSON.parse(sessData);

    department = sessionData.Department;

    if(sessionData.LiveSemester.length != 0) {

        liveSemesterID = sessionData.LiveSemester[0].id;

        liveSemester = sessionData.LiveSemester[0].semesterNumber;

        liveYear = sessionData.LiveSemester[0].year;

        numberOfWeeks = sessionData.LiveSemester[0].numberOfWeeks;


        roundID = sessionData.LiveRound[0].id;

        roundNumber = sessionData.LiveRound[0].roundNo;

        roundStart = datetimeStringConverter(sessionData.LiveRound[0].start);

        roundEnd = datetimeStringConverter(sessionData.LiveRound[0].end);

    }


    if(sessionData.AdHocSemester.length != 0) {

        adHocSemesterID = sessionData.AdHocSemester[0].id;

        adHocSemester = sessionData.AdHocSemester[0].semesterNumber;

        adHocYear = sessionData.AdHocSemester[0].year;

        adHocNumberOfWeeks = sessionData.AdHocSemester[0].numberOfWeeks;


        adHocRoundID = sessionData.AdHocRound[0].id;

        adHocStart = datetimeStringConverter(sessionData.AdHocRound[0].start);

        adHocEnd = datetimeStringConverter(sessionData.AdHocRound[0].end);

    }

    loadFacilities(sessionData.AllFacilities);

    */

}

function getCurrentRoundPercentage() {
    /*
    var currentDate = new Date();

    var percentage = (currentDate.getTime() - roundStart.getTime()) / (roundEnd.getTime() - roundStart.getTime());

    percentage *= 100;

    return percentage;

    */
}