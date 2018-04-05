'use strict';

let field = document.getElementById('field');
let table = document.createElement('table');
let resGoal = document.querySelector('#resultGoal > span');
let goal;
let countGoal = 0;
let lenghtSnake = 3;
let speedSnake = 300;
let verPos = 4;
let horPos = 4;
let runSnakeDown;
let runSnakeUp;
let runSnakeRight;
let runSnakeLeft;
let bodySn = [];
let part; // var for add body

// Create Table
for (let i = 0; i < 30; i++) {
    let tr = table.insertRow(i);
    
    for (let y = 0; y < 30; y++) {
        let td = tr.insertCell(y);
    }
}

// append Table in Field 
field.appendChild(table);

// Create goal color red
function runGoal() {
    if (goal != undefined) {
        goal.classList.remove('goal');
    }
    let ranGoal = Math.floor(Math.random() * 900);
    let choiceRow, choiceColl;
    if (ranGoal > 30) {
        choiceRow = parseInt(ranGoal / 30);
        choiceColl = ranGoal - (choiceRow * 30);
        goal = table.firstChild.childNodes[choiceRow].childNodes[choiceColl-1];
    } else {
        goal = table.firstChild.childNodes[0].childNodes[ranGoal-1];
    }
    goal.classList.add('goal');
}
runGoal();

// snake
let snake = table.firstChild.childNodes[4].childNodes[4];
snake.style.background = '#fff';
// body snace
for (let j = 0; j < lenghtSnake; j++) {
    clearInterval(runSnakeDown);
    if(part == undefined) {
        part = snake.parentNode.previousSibling.childNodes[horPos];
    } else {
        part = part.parentNode.previousSibling.childNodes[horPos];
    }
    bodySn.unshift(part);
    part.style.background = 'yellow';
    snakeDown();
}

document.addEventListener('keyup', hitKey, false);
function hitKey(e) {
    let keyName  = e.key;
    
    if(keyName == 'ArrowUp') snakeUp();
    if(keyName == 'ArrowDown') snakeDown();
    if(keyName == 'ArrowRight') snakeRight();
    if(keyName == 'ArrowLeft') snakeLeft();
}

// Run Snake Down
function snakeDown() {
    clearInterval(runSnakeUp);
    clearInterval(runSnakeRight);
    clearInterval(runSnakeLeft);
    runSnakeDown = setInterval( () => {
        console.log('Snake Down');

        horPos += 1;
        if (horPos > 29)  {
            horPos = 29;
            verifAspect();
        }
        
        snake.style.background = '#ccc';
        snake = table.firstChild.childNodes[horPos].childNodes[verPos];
        snake.style.background = '#fff';
    // new body snake
        if(snake == goal) {
            let newPartBody = snake.parentNode.previousSibling.childNodes[verPos];
            newPartBody.style.background = 'yellow';
            bodySn.unshift(newPartBody);
        }
        verif();

    // move body
        if (bodySn[0]) {
            bodySn[0].style.background = '#ccc' 
        }
        let body = snake.parentNode.previousSibling.childNodes[verPos];
        bodySn.shift();
        bodySn.push(body);
        body.style.background = 'yellow';

    }, speedSnake);
}

// Run Snake Up
function snakeUp() {
    clearInterval(runSnakeDown);
    clearInterval(runSnakeRight);
    clearInterval(runSnakeLeft);
    runSnakeUp = setInterval( () => {
        console.log('Snake Up');
        horPos -= 1;
        if (horPos < 0)  {
            horPos = 0;
            verifAspect();
        }
        snake.style.background = '#ccc';
        snake = table.firstChild.childNodes[horPos].childNodes[verPos];
        snake.style.background = '#fff';
    // new body snake
        if(snake == goal) {
            let newPartBody = snake.parentNode.nextSibling.childNodes[verPos];
            newPartBody.style.background = 'yellow';
            bodySn.unshift(newPartBody);
        }
        verif();

    // move body
        if (bodySn[0]) {
            bodySn[0].style.background = '#ccc' 
        }
        let body = snake.parentNode.nextSibling.childNodes[verPos];
        bodySn.shift();
        bodySn.push(body);
        body.style.background = 'yellow';

    }, speedSnake);
}

// Run Snake Right
function snakeRight() {
    clearInterval(runSnakeUp);
    clearInterval(runSnakeDown);
    clearInterval(runSnakeLeft);
    runSnakeRight = setInterval( () => {
        console.log('Snake Right');

        verPos += 1;
        if (verPos > 29)  {
            verPos = 29;
            verifAspect();
        }
        snake.style.background = '#ccc';
        snake = table.firstChild.childNodes[horPos].childNodes[verPos];
        snake.style.background = '#fff';
    // new body snake
        if(snake == goal) {
            let newPartBody = snake.previousSibling;
            newPartBody.style.background = 'yellow';
            bodySn.unshift(newPartBody);
        }
        verif();

    // move body
        if (bodySn[0]) {
            bodySn[0].style.background = '#ccc' 
        }
        let body = snake.previousSibling;
        bodySn.shift();
        bodySn.push(body);
        body.style.background = 'yellow';
     
    }, speedSnake); 
}

// Run Snake Left
function snakeLeft() {
    clearInterval(runSnakeUp);
    clearInterval(runSnakeDown);
    clearInterval(runSnakeRight);
    runSnakeLeft = setInterval( () => {
        console.log('Snake Left');
        verPos -= 1;
        if (verPos < 0)  {
            verPos = 0;
            verifAspect();
        }
        snake.style.background = '#ccc';
        snake = table.firstChild.childNodes[horPos].childNodes[verPos];
        snake.style.background = '#fff';

        if(snake == goal) {
            let newPartBody = snake.nextSibling;
            newPartBody.style.background = 'yellow';
            bodySn.unshift(newPartBody);
        }
        verif();
    // move body
        if (bodySn[0]) {
            bodySn[0].style.background = '#ccc' 
        }
        let body = snake.nextSibling;
        bodySn.shift();
        bodySn.push(body);
        body.style.background = 'yellow';

    }, speedSnake);
}

// verification goal
function verif() {
    if (snake == goal) {
        countGoal += 1;
        resGoal.textContent = countGoal;

        runGoal();
    }
}
// verification aspect
function verifAspect() {
    clearInterval(runSnakeUp);
    clearInterval(runSnakeDown);
    clearInterval(runSnakeRight);
    clearInterval(runSnakeLeft);
    let end = document.createElement('span');
    end.textContent = 'Game Over';
    table.appendChild(end);
    end.style.display = 'block';
    document.removeEventListener('keyup', hitKey, false);  
}


