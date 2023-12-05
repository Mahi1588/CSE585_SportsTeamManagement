const URL = "https://fir-1c7de-default-rtdb.firebaseio.com/sportsTeamManagment";
function checkIsNull(value) {
    return value === "" || value === undefined || value === null ? true : false;
}
function loginUser() {
    let url = URL + "/userRegister.json"
    if (checkIsNull($("#emailId").val()) || checkIsNull($("#pwdId").val())) {
        alert("Please fill Required Data");
    } else {
        if ($("#isPlayerLogin").prop('checked')) {
            url = URL + "/addPlayer.json"
        }
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: url,
            data: JSON.stringify(),
            success: function (response) {
                let loginUserList = [];
                if ($("#isPlayerLogin").prop('checked')) {
                    for (let userdata in response) {
                        for (let i in response[userdata]) {
                            let data = response[userdata][i];
                            data["userId"] = userdata;
                            data["managerUserId"] = userdata;
                            loginUserList.push(data);
                        }

                    }
                } else {
                    for (let i in response) {
                        let data = response[i];
                        data["userId"] = i;
                        loginUserList.push(data);
                    }
                }

                let isValid = false;
                for (let i = 0; i < loginUserList.length; i++) {
                    if (loginUserList[i].emailId == $("#emailId").val() && loginUserList[i].password == $("#pwdId").val()) {
                        isValid = true;
                        localStorage.setItem("isPlayerLogin", $("#isPlayerLogin").prop('checked'));
                        localStorage.setItem("userId", loginUserList[i].userId);
                        if ($("#isPlayerLogin").prop('checked')) {
                            localStorage.setItem("teamDetails", JSON.stringify(loginUserList[i].teamDetails));
                        } else {
                            localStorage.setItem("teamDetails", JSON.stringify(loginUserList[i]));
                        }

                        window.location.href = "HomeTeamManagment.html";

                    }
                }
                if (!isValid) {
                    alert("User not found");
                }

            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
}
function registerUser() {

    if (checkIsNull($("#memberNameId").val()) || checkIsNull($("#userEmailId").val())
        || checkIsNull($("#passwordId").val()) || checkIsNull($("#contactId").val()) || checkIsNull($("#teamNameId").val())) {
        alert("Please fill all the required data");
    } else {
        let requestBody = {
            "memberName": $("#memberNameId").val(),
            "memberAddress": $("#memberAddressId").val(),
            "emailId": $("#userEmailId").val(),
            "password": $("#passwordId").val(),
            "contactNum": $("#contactId").val(),
            "teamName": $("#teamNameId").val()
        }
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/userRegister.json",
            data: JSON.stringify(requestBody),
            success: function (response) {
                $('#regModelId').modal('hide');
                alert("Sign Up sucessfully!!!");
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
}
$(document).ready(function () {
    $('#regModelId').on('hidden.bs.modal', function (e) {
        $("#memberNameId").val("");
        $("#memberAddressId").val("");
        $("#userEmailId").val("");
        $("#passwordId").val("");
        $("#contactId").val("");
        $("#teamNameId").val("");
    })
})
