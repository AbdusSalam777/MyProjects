let name_;
let email;
let username;
let password;
let otp;

function sendOTP(callback) {
    otp = Math.floor(100000 + Math.random() * 900000);
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
        let button=document.createElement("button");
        document.body.appendChild(button);
        button.innerHTML="Verify OTP";
        button.style.height="30px";
        button.style.width="80px";
        button.style.display="block";
        button.style.position="absolute";
        button.style.marginTop=" 456px";
        button.style.borderRadius="5px";
        button.style.backgroundColor="black";
        button.style.color="white";
        button.style.border="none";
        button.addEventListener("click", function() {
            window.location.href = "verify_otp.html";
        });
        
        verifyOTP();

            console.log("OTP sent successfully to " + email, response);
        },
         function (error) {
            console.log("Error sending OTP: ", error);
        });

        callback(); 
  }

  function verifyOTP() {
      
  }
  
    function show(){
        name_ = document.getElementById("input-name").value;
        email = document.getElementById("input-email").value;
        username = document.getElementById("input-username").value;
        password = document.getElementById("input-password").value; 
        console.log(name_);
        console.log(email);
        console.log(username);
        console.log(password);
        console.log(otp);
    }
     
