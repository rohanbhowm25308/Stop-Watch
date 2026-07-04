let hours = 0;
let minutes = 0;
let seconds = 0;

let timer = null;
let lapCount = 1;

const display = document.getElementById("display");

function updateDisplay(){

    let h = String(hours).padStart(2,'0');
    let m = String(minutes).padStart(2,'0');
    let s = String(seconds).padStart(2,'0');

    display.textContent = `${h}:${m}:${s}`;
}

function startStopwatch(){

    if(timer !== null) return;

    timer = setInterval(() => {

        seconds++;

        if(seconds === 60){
            seconds = 0;
            minutes++;
        }

        if(minutes === 60){
            minutes = 0;
            hours++;
        }

        updateDisplay();

    },1000);
}

function pauseStopwatch(){
    clearInterval(timer);
    timer = null;
}

function resetStopwatch(){

    clearInterval(timer);
    timer = null;

    hours = 0;
    minutes = 0;
    seconds = 0;
    lapCount = 1;

    updateDisplay();

    document.getElementById("lapList").innerHTML = "";
}

function addLap(){

    if(hours === 0 && minutes === 0 && seconds === 0)
        return;

    const lap = document.createElement("li");

    lap.textContent =
    `Lap ${lapCount}: ${display.textContent}`;

    document.getElementById("lapList")
    .appendChild(lap);

    lapCount++;
}

document.getElementById("startBtn")
.addEventListener("click", startStopwatch);

document.getElementById("pauseBtn")
.addEventListener("click", pauseStopwatch);

document.getElementById("resetBtn")
.addEventListener("click", resetStopwatch);

document.getElementById("lapBtn")
.addEventListener("click", addLap);

document.getElementById("themeBtn")
.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

function updateDateTime(){

    const now = new Date();

    document.getElementById("datetime")
    .textContent = now.toLocaleString();
}

setInterval(updateDateTime,1000);
updateDateTime();

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){
        if(timer===null)
            startStopwatch();
        else
            pauseStopwatch();
    }

    if(e.key.toLowerCase()==="r"){
        resetStopwatch();
    }
});