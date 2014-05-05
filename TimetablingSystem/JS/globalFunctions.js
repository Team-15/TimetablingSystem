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