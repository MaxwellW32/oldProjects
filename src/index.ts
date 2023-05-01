
function AllForTrackingMouse(){
    const mySpan = document.querySelector(".mainH1Span") as HTMLSpanElement

    function startKeydown(){
        document.addEventListener("keydown", handleKeydown)
    }
    startKeydown()

    function handleKeydown(event: KeyboardEvent){
        const eventLetter = event.key.toLowerCase()

        if (eventLetter === "k"){
            console.log(`started`)
            startTrackingMouse()
            console.clear()
        }
    }

    function startTrackingMouse(){
            
        let timesRan = 0
        let deviation = 0
        let maxDeviation = 0
        let steps = 0

        function startTrack(){
            document.addEventListener("mousemove", isMouseSteady)
        }
        startTrack()

        const mousePosition = {mouseY: 0}
        const lastMousePosition = {...mousePosition}
        let alreadyRun = false

        function isMouseSteady(event: MouseEvent){
            const { clientY } = event;

            if (!alreadyRun){
                mousePosition.mouseY = clientY 
                lastMousePosition.mouseY = clientY 
                console.log(mousePosition)
                console.log(lastMousePosition)
                alreadyRun = true
            }

            steps++

            if (steps >= 15){
                mousePosition.mouseY = clientY
                steps = 0
            }

            timesRan++

            if (timesRan > 5){
                //check if they are still good
                if (maxDeviation <= 5){
                    // console.log(`good so far`)
                    changeElementColor(mySpan, "green")
                } else {
                    console.log(`ooh not good`)
                    console.log(`maxDev ${maxDeviation}`)
                    changeElementColor(mySpan, "red")
                }

                timesRan = 0
            }

            //check
            deviation = lastMousePosition.mouseY - mousePosition.mouseY

            if (deviation < 0){
                deviation *= -1
            }


            if (deviation > maxDeviation){
                console.log(`dev seen ${maxDeviation} dev ${deviation}`)
                maxDeviation = deviation
            }

            // console.log(`deviation ${deviation} maxD: ${maxDeviation}`)
            lastMousePosition.mouseY = mousePosition.mouseY
        }   
    }
}
AllForTrackingMouse()

function AllForWorkingDiv(){
    //outer function - closure
    let workDiv = document.querySelector(".workingDiv") as HTMLDivElement
    let currentlyRunning = false
    
    function displayMousePosition(){
        document.addEventListener("mousemove", updateWorkDiv)
        currentlyRunning = true
    }

    displayMousePosition()

    let workDivAmount = 0
    
    function updateWorkDiv(event: MouseEvent){
        
        const { clientX, clientY } = event;
        
        workDiv.innerHTML = `X: ${clientX} Y: ${clientY}</p> ${workDiv.innerHTML}`
        
        if (workDivAmount >= 100){
            workDiv.innerHTML = ""
            workDivAmount = -1
        }
        
        workDivAmount++
    }   
}
AllForWorkingDiv()

function handleLongMouseClick(element:string, eventType:string = "mousedown", time: number = 100){
    let mainEls = document.querySelectorAll(`${element}`) as NodeListOf<HTMLElement>
    let timeOut : number | undefined;

    mainEls.forEach((eachEl)=>{
        if (eventType === "mousedown"){
            eachEl.addEventListener(element, ()=>{handleClick("start")})
            eachEl.addEventListener(`mouseup`, ()=>{handleClick("stop")})

        }else if (eventType === "mouseenter"){
            eachEl.addEventListener(element, ()=>{handleClick("start")})
            eachEl.addEventListener(`mouseleave`, ()=>{handleClick("stop")})
        }

        function handleClick(option:string){
                if (option === "start"){
                    timeOut = setTimeout(()=>{
                    console.log(`hello there ${time} ms`)
                    changeElementColor(eachEl, "blue")
                    runVibration(eachEl, "add")
                }, time)
                
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
handleLongMouseClick(".mainH1", "mouseenter")

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
