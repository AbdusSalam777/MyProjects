function save(){
  const name=document.getElementById("name").value;
  const username=document.getElementById("username").value;
  const email=document.getElementById("email").value;
  const password=document.getElementById("pass").value;

  const data={
    "name":name,
    "username":username,
    "email":email,
    "password":password
  }
  console.log(data);

   const sendData=fetch("http://localhost:3000/receive",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(data)
   }).
    then((response)=>{
      if(response.ok){
        window.location.href="/public/index.html";
      }
    console.log("Data sent successfully 👍",data)
   }).
    catch((error)=>{
    console.log(error);
   })

}
