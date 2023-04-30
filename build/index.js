"use strict";
const mousePosition = { mouseX: 0, mouseY: 0 };
const lastPosition = { ...mousePosition };
let timesRun = 0;
//detect mouseposition
document.addEventListener("mousemove", handleMouse);
function handleMouse(event) {
    const { clientX, clientY } = event;
    mousePosition.mouseX = clientX;
    mousePosition.mouseY = clientY;
}
let workDiv = document.querySelector(".workingDiv");
startInterval();
function startInterval() {
    const interval = setInterval(() => {
        if (lastPosition.mouseX === mousePosition.mouseX && lastPosition.mouseY === mousePosition.mouseY) {
            return;
        }
        if (timesRun >= 10) {
            timesRun = 0;
            workDiv.innerHTML = "";
            return;
        }
        lastPosition.mouseX = mousePosition.mouseX;
        lastPosition.mouseY = mousePosition.mouseY;
        workDiv.innerHTML += `<p>X: ${mousePosition.mouseX} Y: ${mousePosition.mouseY}</p>`;
        timesRun++;
    }, 100);
}
handleLongMouseClick(".mainH1", "mouseenter");
function handleLongMouseClick(element, eventType = "mousedown", time = 100) {
    let mainEls = document.querySelectorAll(`${element}`);
    let timeOut;
    mainEls.forEach((eachEl) => {
        if (eventType === "mousedown") {
            eachEl.addEventListener(`mousedown`, () => { handleClick("start"); });
            eachEl.addEventListener(`mouseup`, () => { handleClick("stop"); });
        }
        else if (eventType === "mouseenter") {
            eachEl.addEventListener(`mouseenter`, () => { handleClick("start"); });
            eachEl.addEventListener(`mouseleave`, () => { handleClick("stop"); });
        }
        function handleClick(option) {
            if (option === "start") {
                timeOut = setTimeout(() => {
                    console.log(`hello there ${time} ms`);
                    changeElementColor(eachEl, "blue");
                    runVibration(eachEl, "add");
                }, time);
            }
            else if (option === "stop") {
                if (timeOut) {
                    clearTimeout(timeOut);
                    changeElementColor(eachEl, "black");
                    runVibration(eachEl, "rem");
                }
            }
        }
    });
}
function changeElementColor(element, color) {
    element.style.color = `${color}`;
}
function runVibration(element, option) {
    if (option === "add") {
        element.style.animation = `shake 400ms infinite alternate`;
    }
    else if (option === "rem") {
        element.style.removeProperty("animation");
    }
}
