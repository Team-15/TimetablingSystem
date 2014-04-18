function weeksDecoder(weeksBinaryString) {

    if (weeksBinaryString == undefined) return undefined;
    if (typeof weeksBinaryString != "string") return undefined;

    var weeksBooleanArray = [];

    for (var counter = 0; counter < weeksBinaryString.length; counter++) {

        if (weeksBinaryString[counter] == "0") weeksBooleanArray[counter] = false;
        else if (weeksBinaryString[counter] == "1") weeksBooleanArray[counter] = true;
        else return undefined;

    }

    return weeksBooleanArray;

}

function weeksEncoder(weeksBooleanArray) {

    var weeksBinaryString = "";

    for (var counter = 0; counter < weeksBooleanArray.length; counter++) {

        if (weeksBooleanArray[counter] == true) weeksBinaryString += "1";
        else if (weeksBooleanArray[counter] == false) weeksBinaryString += "0";
        else return undefined;

    }

    return weeksBinaryString;

}

function weeksReadableFormat(weeksBooleanArray) {

    var listOfWeeks = [];

    for (var counter = 0; counter < weeksBooleanArray.length; counter++)
        if (weeksBooleanArray[counter] == true) listOfWeeks.push(counter + 1);

    var keyPoints = [];
    var keyPointsArray = [];

    for (var counter = 0; counter < listOfWeeks.length; counter++) {

        if ((listOfWeeks[counter] + 1) != (listOfWeeks[counter + 1])) {

            keyPoints.push(listOfWeeks[counter]);
            keyPointsArray.push(keyPoints);
            keyPoints = [];

        }
        else keyPoints.push(listOfWeeks[counter]);

    }


    var readableString = "";

    for (var counter = 0; counter < keyPointsArray.length; counter++) {

        var maxElement = keyPointsArray[counter].length - 1;

        if (keyPointsArray[counter][0] == keyPointsArray[counter][maxElement]) 
            readableString += keyPointsArray[counter][0];
        else {
            readableString += keyPointsArray[counter][0] + "-";
            readableString += keyPointsArray[counter][maxElement];
        }

        if (counter != (keyPointsArray.length - 1)) readableString += ", ";

    }

    return readableString;

}