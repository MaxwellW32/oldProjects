"use strict";
const mousePosition = { mouseX: 0, mouseY: 0 };
const lastPosition = { ...mousePosition };
let timesRun = 0;
let timer = 1000;
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
            if (timer > 100) {
                timer -= 100;
                clearInterval(interval);
                startInterval();
            }
            workDiv.innerHTML = "";
            return;
        }
        lastPosition.mouseX = mousePosition.mouseX;
        lastPosition.mouseY = mousePosition.mouseY;
        workDiv.innerHTML += `<p>X: ${mousePosition.mouseX} Y: ${mousePosition.mouseX}</p>`;
        timesRun++;
    }, timer);
}
