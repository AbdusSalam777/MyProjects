 async function fetchData(word) {  //funcion returns a url
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${word}`);
    return response.url;
}

let word;
let imgUrl;

async function showQRcode(){
    const word=document.getElementById("input").value;  //word contains input value
    imgUrl=await fetchData(word);   //calling function to get url
    console.log(imgUrl.url);
    document.getElementById("qrImage").src = imgUrl;
    document.getElementById("qrImage").style.display="block"; 
    
}
