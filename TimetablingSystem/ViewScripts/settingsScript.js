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

    $("#chngePwdBtn").click(function () {
        changePassword();
    });



});

function changePassword() {

    var current = $('#oldpass').val();
    var newpass = $('#newpass').val();
    var newpassconfirm = $('#newpassconfirm').val();

    changePasswordAJAX(current, newpass, newpassconfirm);

    $('#oldpass').val("");
    $('#newpass').val("");
    $('#newpassconfirm').val("");

}

function changePasswordAJAX(oldPwd, newPwd, confirmPwd) {

    $.ajax({
        type: "POST",
        datatype: "JSON",
        contentType: "application/json;charset=utf-8",
        accepts: {
            text: "application/json"
        },
        data: JSON.stringify({
            currentPassword: oldPwd,
            newPassword: newPwd,
            confirmPassword: confirmPwd
        }),
        async: false,
        success: function (results) {

            if (results.Message != null) {
                alert(results.Message);
            }
            else alert("Password Changed");


        },
        error: function (results) {
            alert("Password does not match the confirm password.");
            console.log(JSON.stringify(results));
        },
        url: "api/deptmod/PostChangePassword",
        processData: false
    });

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
        tbl += '<button class="btn btn-primary" id="edit'+i+'" value="'+modulesArray[i].code+'" type="button">Edit</button>'
        tbl += '</td>';
        tbl += '<td>';
        tbl += '<button class="btn btn-primary" id="delete' + i + '" value="' + modulesArray[i].code + '" type="button">Delete</button>'
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
