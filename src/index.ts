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

    }, 100)

}

handleLongMouseClick(".mainH1", "mouseenter")
function handleLongMouseClick(element:string, eventType:string = "mousedown", time:number=100){
    let mainEls = document.querySelectorAll(`${element}`) as NodeListOf<HTMLElement>
    let timeOut : number | undefined;

    mainEls.forEach((eachEl)=>{
        if (eventType === "mousedown"){
            eachEl.addEventListener(`mousedown`, ()=>{handleClick("start")})
            eachEl.addEventListener(`mouseup`, ()=>{handleClick("stop")})
        }else if (eventType === "mouseenter"){
            eachEl.addEventListener(`mouseenter`, ()=>{handleClick("start")})
            eachEl.addEventListener(`mouseleave`, ()=>{handleClick("stop")})
        }

        function handleClick(option:string){
                if (option === "start"){
                    timeOut = setTimeout(()=>{
                    console.log(`hello there ${time} ms`)
                    changeElementColor(eachEl, "blue")
                    runVibration(eachEl, "add")
                },time)
                
            }else if (option === "stop"){
                if (timeOut){
                    clearTimeout(timeOut)
                    changeElementColor(eachEl, "black")
                    runVibration(eachEl, "rem")
                }
            }
        }
    })
}

function changeElementColor(element:HTMLElement, color:string){
    element.style.color = `${color}`
}

function runVibration(element:HTMLElement, option:string){
    if (option === "add"){
        element.style.animation = `shake 400ms infinite alternate`
    }else if (option === "rem"){
        element.style.removeProperty("animation")
    }
}
