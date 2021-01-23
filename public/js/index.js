var str_html;
function initApp() {
    // Login with Email/Password
    var user_name = document.getElementById('username');
    var txtEmail = document.getElementById('Email');
    var txtPassword = document.getElementById('Password');
    var btnCreate = document.getElementById('create_account');
    var btnSignin = document.getElementById('sign_in');
    var btnGoogle = document.getElementById('google');

    btnCreate.addEventListener('click', function() {
        firebase.auth().createUserWithEmailAndPassword (txtEmail.value, txtPassword.value).then(function(){
            if(user_name.value=="")user_name.value = txtEmail.value;
            firebase.database().ref('users').push({
                "user_id": txtEmail.value,
                "user_name": user_name.value
            });
            create_alert("success","success_to_create");
        }).catch(function(error){
            txtEmail.value = "";
            txtPassword.value = "";
            user_name.value = "";
            var errorMessage = error.message;
            create_alert("error",errorMessage);
        });
    });

    btnSignin.addEventListener('click', function() {
        firebase.auth().signInWithEmailAndPassword (txtEmail.value, txtPassword.value).then(function(){
            create_alert("success","success");
            txtEmail.value = "";
            txtPassword.value = "";
            window.location.href="chat.html";
        }).catch(function(error){
            var errorMessage = error.message;
            create_alert("error",errorMessage);
        });
    });

    btnGoogle.addEventListener('click', function() {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup (provider).then(function(result){
            create_alert("success","success to login by google");
            console.log(result.additionalUserInfo.isNewUser );
            if(result.additionalUserInfo.isNewUser){
                firebase.database().ref('users').push({
                    "user_id": result.additionalUserInfo.profile.email,
                    "user_name": result.additionalUserInfo.profile.name
                });
            }
            window.location.href = "chat.html";
        }).catch(function(error){
            var errorMessage = error.message;
            create_alert("error",errorMessage);
        });
    });
    
}

// Custom alert
function create_alert(type, message) {
    var alertarea = document.getElementById('custom-alert');
    if (type == "success") {
        str_html = "<div class='alert alert-success alert-dismissible fade show' role='alert'><strong>Success! </strong>" + message + "</div>";
        alertarea.innerHTML = str_html;
        alertarea.innerHTML = str_html;
        setTimeout(cancel_alert,2000);
    } else if (type == "error") {
        document.getElementById('modal_cont').classList.remove("bounce_in");
        document.getElementById('modal_cont').classList.add("shaking");
        str_html = "<div class='alert alert-danger alert-dismissible fade show' role='alert'><strong>Error! </strong>" + message + "</div>";
        alertarea.innerHTML = str_html;
        setTimeout(cancel_alert,1000);
    }
}
function cancel_alert(){
    var alertarea = document.getElementById('custom-alert');
    str_html = "";
    alertarea.innerHTML = str_html;
    document.getElementById('modal_cont').classList.remove("shaking");
}
window.onload = function() {
    initApp();
};