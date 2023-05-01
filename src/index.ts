
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
        }
    }

    function startTrackingMouse(){
            
        let timesRan = 0
        let deviation = 0
        let maxDeviation = 0
        let steps = 0
        let deviationLimit = 5

        function addMouseMove(){
            document.addEventListener("mousemove", mouseWatch)
        }
        addMouseMove()

        let mousePosition = {mouseY: 0}
        let lastMousePosition = {mouseY: 0}
        let alreadyRun = false

        let lives = 3

        function startOver(){
            // alert(`reset`)
            console.clear()
            timesRan = 0
            deviation = 0
            maxDeviation = 0
            steps = 0
            mousePosition.mouseY = 0
            lastMousePosition.mouseY = 0
            alreadyRun = false
            lives = 3
        }

        function createAllOnScreen(){
            const lifeCount = document.createElement("p")
            lifeCount.setAttribute("class","lifeCount")
            lifeCount.innerHTML = "3 lives"

            const el = document.querySelector(".mainH1") as HTMLHeadingElement

            el.insertAdjacentElement('afterend', lifeCount);

        }
        createAllOnScreen()

        const lifePara = document.querySelector(".lifeCount") as HTMLParagraphElement
        function subLivee(){
            if (lives > 0){
                lives--
            }

            if (lives = 0){
                startOver()
            }

            lifePara.innerHTML = `${lives} lives`
        }

        function mouseWatch(event: MouseEvent){
            const { clientX, clientY } = event;

            if (!alreadyRun){
                mousePosition.mouseY = clientY 
                lastMousePosition.mouseY = clientY 
                alreadyRun = true
            }

            steps++

            if (steps >= 15){
                mousePosition.mouseY = clientY
                steps = 0
            }

            timesRan++

            if (timesRan > 5){
                console.log(`maxDeviation ${maxDeviation}`)
                //check if they are still good
                if (maxDeviation <= deviationLimit){
                    // console.log(`good so far`)
                    changeElementColor(mySpan, "green")
                } else {
                    // console.log(`ooh not good`)
                    changeElementColor(mySpan, "red")
                    subLivee()
                }

                timesRan = 0
            }

            //check
            deviation = lastMousePosition.mouseY - mousePosition.mouseY

            if (deviation < 0){
                deviation *= -1
            }


            if (deviation > maxDeviation){
                maxDeviation = deviation
            }

            // console.log(`deviation ${deviation} maxD: ${maxDeviation}`)
            lastMousePosition.mouseY = mousePosition.mouseY

            setCircleScale(maxDeviation)
            setCircleText(clientX, clientY)
        }   

        function createCircles(amount: number = 2){
            console.log(`hi`)
            for (let i = 0; i < amount; i++) {
                const circle = document.createElement("div")
                circle.setAttribute("id",`circ${i+1}`)
                circle.setAttribute("class","scaleCircle")
                document.body.append(circle)
            }



        }
        createCircles() 
        //circle 1 is dynamic red
        const circle1 = document.querySelector(`#circ1`) as HTMLDivElement
        const circle2 = document.querySelector(`#circ2`) as HTMLDivElement
        circle2.style.scale = `${deviationLimit}`

        function setCircleScale(scale: number = 1){

            if (scale >= deviationLimit){
                scale = deviationLimit
            }

            circle1.style.scale = `${scale}`
        }

        function setCircleText(x: number, y:number){
            circle1.innerHTML = `<p class="circText">X: ${x} Y: ${y}</p>`
        }
    }
}
AllForTrackingMouse()

// function AllForWorkingDiv(){
//     //outer function - closure
//     let workDiv = document.querySelector(".workingDiv") as HTMLDivElement
//     let currentlyRunning = false
    
//     function displayMousePosition(){
//         document.addEventListener("mousemove", updateWorkDiv)
//         currentlyRunning = true
//     }

//     displayMousePosition()

//     let workDivAmount = 0
    
//     function updateWorkDiv(event: MouseEvent){
        
//         const { clientX, clientY } = event;
        
//         workDiv.innerHTML = `X: ${clientX} Y: ${clientY}</p> ${workDiv.innerHTML}`
        
//         if (workDivAmount >= 100){
//             workDiv.innerHTML = ""
//             workDivAmount = -1
//         }
        
//         workDivAmount++
//     }   
// }
// AllForWorkingDiv()

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
