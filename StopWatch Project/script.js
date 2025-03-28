let startTime=0;
let elapsedTime=0;
let interval;

function start(){

    startTime=Date.now()-elapsedTime;
    interval=setInterval(updateTime,100)
}

function stop(){
 clearInterval(interval);
}

function reset(){
    startTime=0;
    elapsedTime=0;
    clearInterval(interval);
    document.getElementById("time").textContent="00 : 00 : 00 : 000";
    
}

function updateTime(){
    elapsedTime=Date.now()-startTime;

    let milliseconds=elapsedTime%1000;
    milliseconds=Math.floor(milliseconds);
    milliseconds=milliseconds.toString().padStart(3,"0");

    let seconds=(elapsedTime/1000)%60;
    seconds=Math.floor(seconds);
    seconds=seconds.toString().padStart(2,"0");

    let minutes=(elapsedTime/(1000*60))%60;
    minutes=Math.floor(minutes);
    minutes=minutes.toString().padStart(2,"0");

    let hours=(elapsedTime/(1000*60*60))%24;
    hours=Math.floor(hours);
    hours=hours.toString().padStart(2,"0");

    document.getElementById("time").textContent=`${hours} : ${minutes} : ${seconds} : ${milliseconds}`


}
