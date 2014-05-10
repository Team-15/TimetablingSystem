function htmlStringFormater(stringArray, newLine) {

    var readableString = "";

    for (var roomCounter = 0; roomCounter < stringArray.length; roomCounter++) {

        readableString += stringArray[roomCounter];

        if (roomCounter != (stringArray.length - 1)) {

            if (newLine) readableString += "</br>";
            else readableString += ", \xa0";

        }

    }

    return readableString;

}

function dbDateTimeConverter(dbDateString) {
    
    var dateTime = dbDateString.split("T");
    var date = dateTime[0].split("-");
    var time = dateTime[1].split(":");

    var dateObject = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);

    return dateObject;

}