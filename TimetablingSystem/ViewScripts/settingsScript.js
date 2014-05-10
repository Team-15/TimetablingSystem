var modulesArray = null;
var oldpass1 = "";
var newpass = "";
var newpass1 = "";


$(document).ready(function () {

    editedModules = [];
    deleteModules = [];


    modulesArray = departmentModules;
 
    table();

    $("#saveChanges").click(function () {
        alert(JSON.stringify(editedModules));
        alert(JSON.stringify(deleteModules));
    });

    $("#addbutton").click(function () {
        var codeL = $("#code").val().length;
        var nameL = $("#name").val().length;
        if (codeL != 0 && nameL != 0) {
            add();
        }
        else {
            alert("Please enter a code and a name for the new module")
        }
    });

    $("#resetbutton").click(function () {
        reset();
    });



});

function setupDummyModules() {

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

    return [module0, module1, module2, module3];
    
}






function table() {
    var tbl = "";
    tbl += '<table id="moduleTable" border="1">';

    for (var i = 0; i < modulesArray.length; i++) {
        tbl += '<tr>';

        tbl += '<td>';
        tbl += modulesArray[i].code;
        tbl += '</td>'
        tbl += '<td class="tdTitle">';
        tbl += modulesArray[i].title;
        tbl += '</td>';
        tbl += '<td>';
        tbl += '<button class="button" id="edit'+i+'" value="'+modulesArray[i].code+'" type="button">Edit</button>'
        tbl += '</td>';
        tbl += '<td>';
        tbl += '<button class="button" id="delete' + i + '" value="' + modulesArray[i].code + '" type="button">Delete</button>'
        tbl += '</td>';
        tbl += '</tr>';

    }
    tbl += '</table>';
    tbl+= 
    document.getElementById('tablediv').innerHTML = tbl;
    setupDelete();
    setupEdit();
}


function add() {

    var newModule = new Module();
    newModule.code = $('#code').val();
    newModule.title = $('#name').val();

    modulesArray.push(newModule);

    document.getElementById("code").value = "";
    document.getElementById("name").value = "";

    table();

}

function remove(index, mCode) {
    deleteModules.push({
        deleteCode: mCode
    });
    modulesArray.splice(index, 1);
    table();

}

function edit(index, mCode) {
    var tempCode = window.prompt("Please enter the new Code", modulesArray[index].code);

    if (tempCode != null) modulesArray[index].code = tempCode;

    var tempTitle = window.prompt("Please enter the new Title", modulesArray[index].title);

    if (tempTitle != null) modulesArray[index].title = tempTitle;
    table();
    editedModules.push({
        originalCode: mCode,
        newCode: modulesArray[index].code,
        newTitle: modulesArray[index].title
    });
}





/*
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
*/

function reset() {
    oldpass1 = $('#oldpass').val();;
    newpass = $('#newpass').val();
    newpass1 = $('#newpass1').val()

    if (oldpass1 != "oldpass") {
        alert("Incorrect Password, Please try again");
    }
    else {
        if (newpass.length != 0 && newpass1 != 0) {
            if (newpass == newpass1) {
                alert("Password has been changed");
            }
            else {
                alert("Passwords do not match")
            }
        }
        else { alert("Please enter your new password")}
    }

}



function setupDelete() {
    for (var i = 0; i < modulesArray.length; i++) {
        $("#delete" + i).data("index", i);
        $("#delete" + i).click(function () {
            
            remove($(this).data("index"),$(this).val());
        });
    }
}

function setupEdit() {
    for (var i = 0; i < modulesArray.length; i++) {
        $("#edit" + i).data("index", i);
        $("#edit" + i).click(function () {
            edit($(this).data("index"),$(this).val());
        });
    }
}
