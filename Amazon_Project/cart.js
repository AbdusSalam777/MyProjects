function GetData(){
fetch("http://localhost:3000/give-data").
    then((response)=>{
     return response.json();
    }).then((data)=>{
        let detail=[]
        detail=data;
       console.log(detail);

const size=detail.length;
let total_price=0;

for(let i=0;i<size;i++){
    total_price+=Number(detail[i].price);
}

console.log(total_price);

const items_show=document.getElementById("items-show");
items_show.innerHTML=size;
console.log("1",items_show);

const shipping_show=document.getElementById("shipping-show");
shipping_show.innerHTML=total_price;

const total_show=document.getElementById("total-show");
total_show.innerHTML=total_price;

    })//end of fetch function

}
GetData();