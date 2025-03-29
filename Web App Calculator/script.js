let input=document.getElementById("display");

function displayfunc(value){
    input.value+=value;
}
function evaluateExp(value){
    input.value=eval(input.value);
}

function clearfunc(){
    input.value="";
}
