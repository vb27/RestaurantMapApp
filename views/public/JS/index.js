$(function () {
            ​
            $("#btnLogin").on("click", (event) => {
                event.preventDefault();​
                const userN = $("#userName").val().trim();
                const userP = $("#userPass").val().trim();​
                // connect to database check id
                if (userN != "" && userP != "") {
                    const loginUser = {
                        userName: userN,
                        userPass: userP
                    }​
                    $.ajax("/api/check", {
                        type: "GET",
                        data: loginUser
                    }).then()
                }​
            }); // End of Loginbutton
            ​
            $("#btnRegister").on("click", (event) => {
                event.preventDefault();​
                const userN = $("#userName").val().trim();
                const userP = $("#userPass").val().trim();​
                //validate
                if (userN != "" && userP != "") {
                    const newUser = {
                        userName: userN,
                        userPass: userP
                    }​
                    $.ajax("/api/newuser", {
                        type: "POST",
                        data: newUser
                    }).then(() => {
                        alert("Register success");
                    })​
                }​
            }); // END of Registerbutton
            ​
            $("#btnSearchLocation").on("click", (event) => {
                event.preventDefault();​
                const userSearch = $("#userSearch").val().trim();

                // validate
                if (userSearch != "") {
                    const mySearch = {
                        search: userSearch
                    }​
                    $.ajax("/api/searchlocation", {
                        type: "GET",
                        data: mySearch
                    }).then(() => {

                    })
                }
            }); // END of searchLocation
            ​
            $("#btnSearchUser").on("click", (event) => {
                event.preventDefault();​
                const userSearch = $("#userSearch").val().trim();

                // validate
                if (userSearch != "") {
                    const mySearch = {
                        search: userSearch
                    }​
                    $.ajax("/api/searchuser", {
                        type: "GET",
                        data: mySearch
                    }).then(() => {

                    })
                }
            }) // END of searchUser
            ​
        }