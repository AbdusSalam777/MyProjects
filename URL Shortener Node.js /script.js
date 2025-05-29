const form=document.getElementById('form');

form.addEventListener('submit',async(event)=>{
  event.preventDefault();
  const formdata=new FormData(form);

  const url=formdata.get('url');
  const short=formdata.get('short');
  
  console.log(url);
  console.log(short);
  document.getElementById('ans').innerHTML=`<a href="http://localhost:3002/${short}">http://localhost:3002/${short}</a>`;

  
  try {

      const response=await fetch('/shorten',
      {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({url,short})
      }
  )

  console.log('Data send successfully 👍');

  } 
  catch (error) {
    
   console.log(error);

  }


})
