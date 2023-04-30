const mousePosition = {mouseX: 0, mouseY: 0}
const lastPosition = {...mousePosition}
let timesRun = 0

//detect mouseposition
document.addEventListener("mousemove", handleMouse)

function handleMouse(event: MouseEvent){
    const { clientX, clientY } = event;

    mousePosition.mouseX = clientX
    mousePosition.mouseY = clientY
}

let workDiv = document.querySelector(".workingDiv") as HTMLDivElement

startInterval()
function startInterval(){
    const interval = setInterval(()=>{

        if (lastPosition.mouseX === mousePosition.mouseX && lastPosition.mouseY === mousePosition.mouseY){
            return
        }

        if (timesRun >= 10){
            timesRun = 0

            workDiv.innerHTML = ""
            return 
        }

        lastPosition.mouseX = mousePosition.mouseX
        lastPosition.mouseY = mousePosition.mouseY


        workDiv.innerHTML += `<p>X: ${mousePosition.mouseX} Y: ${mousePosition.mouseY}</p>`
        timesRun++

    }, 1000)

}