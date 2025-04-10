let name_;
let email;
let username;
let password;

function sendOTP() {
    let otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    name_ = document.getElementById("input-name").value;
    email = document.getElementById("input-email").value;
    username = document.getElementById("input-username").value;
    password = document.getElementById("input-password").value;
    console.log(email);

    //Initialize emailjs with public key
    emailjs.init("UBgttDNUV7h4AJf-_");

    emailjs.send("service_lmnxqrh", "template_qm9270q", {
        to_email: email,
        to_name: name_,
        otp: otp,
    })
        .then(function (response) {

            console.log("OTP sent successfully to " + email, response);
        }, function (error) {

            console.log("Error sending OTP: ", error);
        });
}
