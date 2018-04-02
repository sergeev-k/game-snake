'use strict';

let field = document.getElementById('field');
let table = document.createElement('table');
let resGoal = document.querySelector('#resultGoal > span');
let goal;
let countGoal = 0;
let speedSnake = 500;

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
let lenghtSnake = 2;
let snake = table.firstChild.childNodes[4].childNodes[4];

let bodySnake = [];

snake.classList.add('snake');


let verPos = 4;
let horPos = 4; 
let v = 0;
let h = 0;
let runSnakeDown;
let runSnakeUp;
let runSnakeRight;
let runSnakeLeft;

document.addEventListener('keyup', hitKey, false);
function hitKey(e) {
    let keyName  = e.key;
    
    if(keyName == 'ArrowUp') {
        snakeUp();
    }
    if(keyName == 'ArrowDown') {
        snakeDown();
    }
    if(keyName == 'ArrowRight') {
        snakeRight();
    }
    if(keyName == 'ArrowLeft') {
        snakeLeft();
    }
}

// Run Snake Down
function snakeDown() {
    clearInterval(runSnakeUp);
    clearInterval(runSnakeRight);
    clearInterval(runSnakeLeft);
    runSnakeDown = setInterval( () => {
        console.log('Snake Down');
        h += 1;
        horPos += 1;
        if (horPos > 29)  {
            horPos = 29;
            verifAspect();
        }
        
        snake.classList.remove('snake');
        snake = table.firstChild.childNodes[horPos].childNodes[verPos];

// test snake
        if (partSnake[0]) {
           partSnake[0].style.background = '#ccc'; 
        }
        testSnake(h, 0);

        // console.log(bodySnake[lenghtSnake-1]);
        if (bodySnake[lenghtSnake-1]) {
            bodySnake[lenghtSnake-1].style.background = '#ccc';
        }
        createSnake();
        verif();
        snake.classList.add('snake');
    }, speedSnake);
}

// Run Snake Up
function snakeUp() {
    clearInterval(runSnakeDown);
    clearInterval(runSnakeRight);
    clearInterval(runSnakeLeft);
    runSnakeUp = setInterval( () => {
        console.log('Snake Up');
        h -= 1;
        horPos -= 1;
        if (horPos < 0)  {
            horPos = 0;
            verifAspect();
        }
        snake.classList.remove('snake');
        snake = table.firstChild.childNodes[horPos].childNodes[verPos];
// test snake
        partSnake[2].style.background = '#ccc';
        testSnake(h, 0);

        bodySnake[0].style.background = '#ccc'
        createSnake();
        verif();
        snake.classList.add('snake');
    }, speedSnake);
}

// Run Snake Right
function snakeRight() {
    clearInterval(runSnakeUp);
    clearInterval(runSnakeDown);
    clearInterval(runSnakeLeft);
    runSnakeRight = setInterval( () => {
        console.log('Snake Right');
        v +=1;
        verPos += 1;
        if (verPos > 29)  {
            verPos = 29;
            verifAspect();
        }
        snake.classList.remove('snake');
        snake = table.firstChild.childNodes[horPos].childNodes[verPos];
// test Snake
        console.log(`ver: ${v}, hor: ${h}`);
        testSnake(h, v);
        
        verif();
        snake.classList.add('snake');
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
        snake.classList.remove('snake');
        snake = table.firstChild.childNodes[horPos].childNodes[verPos];
        verif();
        snake.classList.add('snake');
    }, speedSnake);
}
// Create Body Snake
function createSnake() {
    for (let x = 0; x < lenghtSnake; x++) {
        if (x == 0) {
            bodySnake[0] = snake.parentElement.previousElementSibling.children[4];
        } else {
            bodySnake[x] = bodySnake[x-1].parentElement.previousElementSibling.children[4];
        }
        bodySnake[x].style.background = '#000';    
    }
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
    let end = document.createElement('span');
    end.textContent = 'Game Over';
    table.appendChild(end);
    end.style.display = 'block';
    document.removeEventListener('keyup', hitKey, false);
    clearInterval(runSnakeUp);
    clearInterval(runSnakeDown);
    clearInterval(runSnakeRight);
    clearInterval(runSnakeLeft);
}
let partSnake = [];
function testSnake(v = 0, h = 0) {

    partSnake = [];
    for (let l = 0; l < 3; l++) {
        
        let part = table.firstChild.childNodes[l + v].childNodes[h];
        partSnake.push(part);
        part.style.background = 'blue';
        
    }
}

snakeDown();


