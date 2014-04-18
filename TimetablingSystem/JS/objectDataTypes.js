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
    this.id = "";
    this.module = new Module();

    this.priority = true;

    this.day = 0;
    this.startPeriod = 0;
    this.endPeriod = 1;
    this.weeks = [];

    this.students = 1;
    this.park = 0;
    this.traditional = true;
    this.sessionType = 0;
    this.noOfRooms = 1;

    this.facilities = [];
    this.otherReqs = "";

    //Only code strings required - do not store Room objects array
    this.rooms = [];
    this.allocatedRooms = []; 

    this.round = null;

    this.status = null;

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

            if (facilityCodesArray[count] == facilitiesArray[counter].id) titleArray.push(facilitiesArray[counter].name);

        }
    }

    return titleArray;
}