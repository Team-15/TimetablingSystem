var module0 = new Module();

module0.code = "COA123";
module0.title = "Test module 1";
module0.deptCode = "CO";
module0.active = true;

var module1 = new Module();

module1.code = "COA124";
module1.title = "Test module 2";
module1.deptCode = "CO";
module1.active = true;

var module2 = new Module();

module2.code = "COA125";
module2.title = "Test module 3";
module2.deptCode = "CO";
module2.active = true;

var module3 = new Module();

module3.code = "COA126";
module3.title = "Test module 4";
module3.deptCode = "CO";
module3.active = true;

var modulesArray = [module0, module1, module2, module3];


function table() {
    var tbl = "";
    tbl += '<table border="1">';

    for (var i = 0; i < modulesArray.length; i++) {
        tbl += '<tr>';

        tbl += '<td>';
        tbl += modulesArray[i].code;
        tbl += '</td>'
        tbl += '<td>';
        tbl += modulesArray[i].title;
        tbl += '</td>';
        tbl += '<td>';
        tbl += '<button type="button" onclick="edit(' + i + ')">edit</button>'
        tbl += '</td>';
        tbl += '<td>';
        tbl += '<button type="button" onclick="remove(' + i + ')">delete</button>'
        tbl += '</td>';
        tbl += '</tr>';

    }
    tbl += '</table>';
    document.getElementById('tablediv').innerHTML = tbl;
}


function add() {
    var last = modulesArray.length;
    var Modnamenew = document.getElementById("name").value;
    var Modcodenew = document.getElementById("code").value;
    var newmodule = "module".concat(last);
    var newmodule = new Module();
    modulesArray.push(newmodule);
    modulesArray[last].code = Modcodenew;
    modulesArray[last].title = Modnamenew;
    table();
}

function remove(index) {
    modulesArray.splice(index, 1);
    table();
}

function edit(index) {
    var nCode = window.prompt("Please enter the new Code", modulesArray[index].code);
    modulesArray[index].code = nCode;
    var nTitle = window.prompt("Please enter the new Title", modulesArray[index].title);
    modulesArray[index].title = nTitle;
    table();
}

var newpass = "";
var newpass1 = "";
var pass = "";

function reset1() {
    newpass = window.prompt("Please enter your new password");
    newpass1 = window.prompt("Please confirm your new password");

    if (newpass != newpass1) {
        alert("Passwords do not match please try again");
        reset1();

    }
    else {
        alert("Your password has been changed")
        pass = newpass
    }
}


function reset() {
    var oldpass = window.prompt("Please enter your old password");
    if (oldpass != "oldpass") {
        alert("Incorrect Password, Please try again");
        reset();
    }
    else {
        reset1();
    }

}

$(document).ready(function () {
    table();
});

$("#addbutton").click(function () {
    add();
});

$("#resetbutton").click(function () {
    reset();
});