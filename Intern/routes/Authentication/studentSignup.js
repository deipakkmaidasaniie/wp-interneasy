'use strict';

var getData = function(request, response) {
    return response.render("student-signup.hbs");
}

var postData = function(request, response) {
    var DB = request.app.locals.DB;

    var confirmPassword = request.body.confirmPassword;

    var user = {
        userName: request.body.userName,
        password: request.body.password,
        email: request.body.email,
        city: request.body.city,
        dob: request.body.dob
    };

    if(user.password == confirmPassword) {
        DB.collection("students").insertOne(user, function(error) {
            if(error) {
                response.send("error occured while signup");
            } 
            else {

                if (Notification.permission === "granted") {
                    showNotification();
                }
    
                else if (Notification.permission != "denied") {
                    Notification.requestPermission().then(permission => {
                        if (permission === "granted" && flag === 1) {
                            showNotification();
                        }
    
                    })
                }
    
                 function showNotification() {
                    const notification = new Notification("New message from Deepak!", {
                        body: "Hey! You have selected a great list of fruits.",
                        icon: "fruits.jpg"
                    });
                    notification.onclick = function () {
                        alert("Notification clicked!"),
                            window.open("http://google.com")
                          //  showNotification();
                    };                
                
                    //notification.close();
                    setTimeout(notification.close.bind(notification), 7000); 
    
                }
            
                request.session.user = null;
                response.redirect("/");
            }
        });
        return;
    } else {
        response.redirect("/signupStudent");
    }
}


exports.getData = getData;
exports.postData = postData;
