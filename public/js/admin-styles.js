
$(".signup-form").on("submit", function(event) {
    event.preventDefault();

    var email = $(".email").val().trim(),
        password = $(".password").val().trim(),
        confirmPassword = $(".confirm-password").val().trim();

    if (email == "") {
        $(".form-res-msg").html("Please enter your username").css('color','red')
    } else if (password == "") {
        $(".form-res-msg").html("Please enter your password").css('color','red')
    } else if (confirmPassword == "") {
        $(".form-res-msg").html("Please enter your confirmation password").css('color','red')
    } else if (password != confirmPassword) {
        $(".form-res-msg").html("Your password and confirmation password do not match").css('color','red')
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(msg) {
            $(".form-res-msg").html("Signup succesful").css("color","green");
            setTimeout(function() {
                window.location.href = "/login";
            }, 2000);
            
        }).catch(function(error) { $(".form-res-msg").html(error.message).css("color","red");
        });
    }
});


$(".login-form").on("submit", function(event) {
    event.preventDefault();

    var email = $(".email").val().trim(),
        password = $(".password").val().trim();

    if (email == "") {
        $(".form-res-msg").html("Please enter your username").css('color','red')
    } else if (password == "") {
        $(".form-res-msg").html("Please enter your password").css('color','red')
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(msg) {
            $(".form-res-msg").html("Login successful").css('color','green');
            setTimeout(function() {
                window.location.href = "/dashboard";
            }, 2000);
        }).catch(function(error) {
            $(".form-res-msg").html(error.message).css('color','red')
        });
    }
})

firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
      window.location.href = "/login";
    } 
});