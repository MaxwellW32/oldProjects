"use strict";
function startAll() {
    //declare dom elements here
    function makeElement(elType, id, className) {
        const element = document.createElement(`${elType}`);
        if (id !== "") {
            element.setAttribute("id", `${id}`);
        }
        if (className !== "") {
            element.setAttribute("class", `${className}`);
        }
        return element;
    }
    function makeAll() {
        //make all elements on the page
        //add rootdiv
        const rootDiv = makeElement("div", "rootDiv", "");
        const body = document.querySelector('body');
        const firstChild = body.firstElementChild;
        if (firstChild === null) {
            body.appendChild(rootDiv);
        }
        else if (firstChild.id !== "rootDiv") {
            body.insertBefore(rootDiv, firstChild.nextSibling);
        }
    }
    makeAll();
    //useAll properties made - variable declarations
    const rootDiv = document.querySelector("#rootDiv");
    function myGame(amount) {
        rootDiv.innerHTML = "";
        //brown squares
        function makeSmallRecs(amount) {
            for (let i = 0; i < amount; i++) {
                const smallRec = makeElement("div", "", "smallRec");
                rootDiv.appendChild(smallRec);
            }
        }
        makeSmallRecs(amount);
        const smallRectangles = document.querySelectorAll(".smallRec");
        //main code starts here
        const allRecPositions = {};
        const alldistCompareAll = {};
        smallRectangles.forEach((eachRec, index) => {
            const rndWidth = 5 - Math.floor((Math.random() * 1));
            const maxWidth = 100 - rndWidth;
            const maxHeight = 100 - rndWidth;
            const rndX = Math.floor(Math.random() * maxWidth);
            const rndY = Math.floor(Math.random() * maxHeight);
            eachRec.style.top = `${rndY}%`;
            eachRec.style.left = `${rndX}%`;
            eachRec.style.width = `${rndWidth}%`;
            allRecPositions[`box${index + 1}`] = [rndX + rndWidth / 2, rndY + rndWidth / 2, false];
            eachRec.setAttribute("id", `box${index + 1}`);
        });
        let currentBox = "box1";
        let smallestDistArrObj = ["", Infinity];
        let runAmt = 0;
        function assignNextSmallest() {
            allRecPositions[currentBox][2] = true;
            smallestDistArrObj = ["", Infinity];
            let comparedDistance;
            for (const key in allRecPositions) {
                if (allRecPositions[key][2] === false) {
                    comparedDistance = findDistance(allRecPositions[currentBox][0], allRecPositions[currentBox][1], allRecPositions[key][0], allRecPositions[key][1]);
                    alldistCompareAll[key] = comparedDistance;
                    if (comparedDistance <= smallestDistArrObj[1]) {
                        smallestDistArrObj = [key, comparedDistance];
                    }
                }
            }
            allRecPositions[smallestDistArrObj[0]][2] = true;
            const div1Rect = {
                left: allRecPositions[currentBox][0],
                right: 100 - allRecPositions[currentBox][0],
                top: allRecPositions[currentBox][1],
                bottom: 100 - allRecPositions[currentBox][1]
            };
            const div2Rect = {
                left: allRecPositions[smallestDistArrObj[0]][0],
                right: 100 - allRecPositions[smallestDistArrObj[0]][0],
                top: allRecPositions[smallestDistArrObj[0]][1],
                bottom: 100 - allRecPositions[smallestDistArrObj[0]][1]
            };
            const midpoint = {
                x: (div1Rect.left + div2Rect.left) / 2,
                y: (div1Rect.top + div2Rect.top) / 2,
            };
            const angle = Math.atan2(div2Rect.top - div1Rect.top, div2Rect.left - div1Rect.left);
            const segmentCount = 10;
            const segmentLength = comparedDistance / segmentCount;
            const segmentPoints = [];
            for (let i = 0; i <= segmentCount; i++) {
                const x = midpoint.x + Math.cos(angle) * (i * segmentLength);
                const y = midpoint.y + Math.sin(angle) * (i * segmentLength);
                // Check if the x coordinate lies outside the bounds of the parent divs
                if (x < Math.min(div1Rect.left, div2Rect.left) || x > Math.max(div1Rect.right, div2Rect.right)) {
                    continue;
                }
                // Check if the y coordinate lies outside the bounds of the parent divs
                if (y < Math.min(div1Rect.top, div2Rect.top) || y > Math.max(div1Rect.bottom, div2Rect.bottom)) {
                    continue;
                }
                segmentPoints.push({ x, y });
            }
            let initial = 0;
            callABubble(10);
            function callABubble(time) {
                setTimeout(() => {
                    if (initial < segmentPoints.length - 1) {
                        createBubble(segmentPoints[initial].x, segmentPoints[initial].y);
                        initial++;
                        callABubble(time);
                    }
                    else {
                        wdAnything(`#${currentBox}`, `<p>${currentBox}<p>`, "backgroundColor", "green");
                        currentBox = smallestDistArrObj[0];
                        wdAnything(`#${smallestDistArrObj[0]}`, "$$nochange$$", "backgroundColor", "red");
                        if (runAmt < smallRectangles.length - 2) {
                            assignNextSmallest();
                        }
                        else {
                            myGame(smallRectangles.length + 1);
                        }
                        runAmt++;
                    }
                }, time);
            }
        }
        assignNextSmallest();
        // let runAmt = 0
        // const myInterval = setInterval(()=>{
        //     if (runAmt < smallRectangles.length - 1){
        //         assignNextSmallest()
        //     }else{
        //         clearInterval(myInterval)
        //         myGame(smallRectangles.length+1)
        //     }
        //     runAmt++
        // }, 1000)
    }
    myGame(5);
    function findDistance(x1, y1, x2, y2) {
        const xDiff = x2 - x1;
        const yDiff = y2 - y1;
        const distance = Math.sqrt(xDiff ** 2 + yDiff ** 2);
        return distance;
    }
    function createBubble(coordX, coordY) {
        const bubble = document.createElement("div");
        bubble.setAttribute("class", "bubble");
        bubble.style.top = `${coordY}%`;
        bubble.style.left = `${coordX}%`;
        // bubble.style.backgroundColor = `rgb(${255 - activeId * 20},${activeId*10},${activeId*30})`
        rootDiv.appendChild(bubble);
        setTimeout(() => {
            bubble.style.animation = `rumbleBubble 2500ms`;
            setTimeout(() => {
                bubble.remove();
            }, 2500);
        }, 4000);
    }
    function wdAnything(elements, textValue, styleProp, stylePropValue) {
        //write any change to the DOM
        if (typeof elements === "string") {
            const getAllEl = document.querySelectorAll(`${elements}`);
            if (!getAllEl) {
                console.log(`couldn't find element`);
                return;
            }
            else {
                elements = getAllEl;
            }
        }
        if (elements instanceof NodeList) {
            elements.forEach(addChange);
        }
        else if (elements instanceof HTMLElement) {
            addChange(elements);
        }
        function addChange(element) {
            if (styleProp && stylePropValue) {
                element.style[styleProp] = stylePropValue;
            }
            if (textValue !== "$$nochange$$") {
                element.innerHTML = textValue;
            }
        }
    }
}
startAll();
