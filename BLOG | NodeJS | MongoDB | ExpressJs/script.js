function send_login() {
  const username_in = document.getElementById("username-in").value;
  const password_in = document.getElementById("password-in").value;
  console.log("Username", username_in, "", "Password", password_in);

  fetch("/admin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body:JSON.stringify({
    username: username_in, 
    password: password_in
  })
  }).then((response)=>{
    return response.json()}).
  then((res)=>{
    if(res.success){
      window.location.href="/dashboard";
    }
  })
}
function send_register() {
  const username_reg = document.getElementById("username-reg").value;
  const password_reg = document.getElementById("password-reg").value;
  console.log("Username", username_reg, "", "Password", password_reg);


  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body:JSON.stringify(
      {
    username: username_reg, 
    password: password_reg
     }
    )
  }).then(()=>{
    console.log("Sent").catch((error)=>{
        console.log(error);
        
    })
    
  })
}

function send_txt(){
  const path = window.location.pathname;
  const id = path.split("/")[2];
  const text=document.getElementById("text-area").value;
  
  fetch("/send-text",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id:id,text:text})
  })
}