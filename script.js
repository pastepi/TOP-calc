// Math functions

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) {
        return "You can't divide by 0!"
    }
    return a / b;
}

const operate = (operator, a, b) => {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
}

// Elements/variables

let calcDisplay = document.getElementById('calc-display');
const buttons = document.querySelectorAll('button');
const commaKey = document.getElementById('comma-key');

let calcNumber = 0;

// Event handlers

const handleButtonClick = (e) => {
    console.log(e.target.textContent);

    let currentDisplay = calcDisplay.textContent;
    let clickInput = e.target.textContent;
    
    if (clickInput.match(/[0-9]/g)) {
        
        if (currentDisplay === "0") {
            currentDisplay = clickInput;
        } else {
            currentDisplay = currentDisplay.concat(clickInput);
        }
    } else if (clickInput === 'backspace') {
        if (currentDisplay.slice(-1) === ".") { commaKey.disabled = false };
        currentDisplay = currentDisplay.slice(0, currentDisplay.length - 1);
    } else if (clickInput === 'C') {
        currentDisplay = "0";
        commaKey.disabled = false;
    } else if (clickInput === '.' && (!currentDisplay.match(/\./g))) {
        currentDisplay = currentDisplay.concat(clickInput);
        commaKey.disabled = true;
    }
    // else if (clickInput.match(//g))

    if (currentDisplay !== "") {
        calcDisplay.textContent = currentDisplay;
    } else {
        calcDisplay.textContent = "0";
    }
}

// Event listeners

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick)
})

