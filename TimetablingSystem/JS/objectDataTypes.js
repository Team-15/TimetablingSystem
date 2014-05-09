function Department() {

    this.code = "";
    this.name = "";

}


//Module Object Class
function Module() {

    this.code = "";
    this.title = "";
    this.deptCode = "";
    this.active = true;

}

//Facility Object Class
function Facility() {

    this.id = "";
    this.name = "";

}

//Request Object Class
function Request() {

    //Main fields (data required for all instances)
    this.id = ""; //Number 
    this.module = new Module(); // One Module Object is stored - see module object (Above)

    this.priority = true; // Boolean

    this.day = 0; //Index of daysArray, see globalConstants.js
    this.startPeriod = 0; //Index of periodsArray, see globalConstants.js
    /* NOTE:
    endPeriods =< startPeriod
    e.g. if startPeriod is 1 and endPeriod is 1, then then it's a duartion of 1 hour, a.k.a. 1 period long session
    if startPeriod is 2 and end endPeriod is 3, then it's a duration of 2 hours, a.k.a. 2 periods long session
    NEVER startPeriod 1 and endPeriod 2, where start is lower than end
    */
    this.endPeriod = 1; //Second Index of periodsArray, see globalConstants.js
    this.weeks = []; //Boolean of true and false array, where index represents week

    this.students = 1; //Number > 0 
    this.park = 0; //Index of parksArray, see globalConstants.js
    this.traditional = true; //If true, Tradional, if false, Seminar
    this.sessionType = 0; //Index of sessionTypesArray, see globalConstants.js
    this.noOfRooms = 1; //Number > 0

    this.facilities = []; //Array of facility IDs as ints
    this.otherReqs = ""; //String

    //Only code strings required - do not store Room objects array
    this.rooms = []; //Array of room codes as strings
    this.allocatedRooms = []; //Array of room codes as strings

    this.round = null; //Number

    this.status = null; //Index of statusArray, see globalConstants.js, excluding unsumbitted, which is NULL

}

//Building Object Class
function Building() {

    this.code = "";
    this.name = "";
    this.park = null;
    this.rooms = []; //contains array of Room Object/Data type

}

//Room Object Class
function Room() {

    this.code = "";
    this.type = null;
    this.capacity = null;
    this.facilities = [];

}




function getFacilityTitles(facilityCodesArray) {

    var titleArray = [];

    for (var count in facilityCodesArray) {

        for (var counter = 0; counter < facilitiesArray.length; counter++) {

            if (facilityCodesArray[count] === facilitiesArray[counter].id) titleArray.push(facilitiesArray[counter].name);

        }
    }

    return titleArray;
}