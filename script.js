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
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
}

// Elements/variables

let calcDisplay = document.getElementById('calc-display');
const buttons = document.querySelectorAll('button');
const commaKey = document.getElementById('comma-key');

let displayValue = calcDisplay.textContent;
let firstOperand;
let secondOperand;
let operandFlag = true;
let currentOperator;

// Event handlers

const handleButtonClick = (e) => {

    let clickInput = e.target.textContent;

    if (clickInput.match(/[0-9]/g)) {
        inputNumber(clickInput);
    } else if (clickInput === 'backspace') {
        inputBackspace();
    } else if (clickInput === 'C') {
        inputClear();
    } else if (clickInput === '.' && (!displayValue.match(/\./g))) {
        inputComma();
    } else if (clickInput.match(/[\+\-÷\x]/gi)) { 
        inputOperator(clickInput);
    }

    handleDisplay();
}

const inputNumber = (digit) => {
    if (currentOperator) { operandFlag = false; }
    if (displayValue === '0') {
        displayValue = digit;
    } else {
        displayValue = displayValue + digit;
    }
}

const inputBackspace = () => {
    if (displayValue.slice(-1) === ".") { commaKey.disabled = false };
    displayValue = displayValue.slice(0, displayValue.length - 1);
    if (displayValue === '') { displayValue = '0' }
}

const inputClear = () => {
    displayValue = '0';
    commaKey.disabled = false;
}

const inputComma = () => {
    displayValue = displayValue + '.';
    commaKey.disabled = true;
}

const inputOperator = (operator) => {
    currentOperator = operator;
}

const handleDisplay = () => {
    if (operandFlag) {
        firstOperand = displayValue;
    } else {
        secondOperand = displayValue;
    }

    calcDisplay.textContent = displayValue;
}

const inputEquals = () => {
    firstOperand = operate(currentOperator, firstOperand, secondOperand);
    
}

// Event listeners

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick)
})



  // let currentDisplay = calcDisplay.textContent;
    // let clickInput = e.target.textContent;

    // if (calcNumber.length > 0 && !firstNum) { // Only change the display to 2nd number
    //     firstNum = currentDisplay             // after user starts inputting it
    //     currentDisplay = '';
    // }

    // if (clickInput.match(/[0-9]/g)) {
        
    //     if (currentDisplay === "0") {
    //         currentDisplay = clickInput;
    //     } else {
    //         currentDisplay = currentDisplay.concat(clickInput);
    //     }
    // } else if (clickInput === 'backspace') {
    //     if (currentDisplay.slice(-1) === ".") { commaKey.disabled = false };
    //     currentDisplay = currentDisplay.slice(0, currentDisplay.length - 1);
    // } else if (clickInput === 'C') {
    //     currentDisplay = "0";
    //     commaKey.disabled = false;
    // } else if (clickInput === '.' && (!currentDisplay.match(/\./g))) {
    //     currentDisplay = currentDisplay.concat(clickInput);
    //     commaKey.disabled = true;
    // } else if (clickInput.match(/[\+\-÷\x]/gi)) {
    //     if (calcOperator !== clickInput && calcNumber[0]) {
    //         calcOperator = clickInput;
    //         return;
    //     }

    //     calcNumber.push(currentDisplay);
    //     if (calcNumber.length > 1) {
    //         calcNumber[0] = calcNumber.reduce((a, b) => operate(calcOperator, Number(a), Number(b)));
    //         currentDisplay = calcNumber[0];
    //         calcNumber.pop();
    //         firstNum = null;
    //     } 
        
    //     console.log(calcNumber);
    //     console.log(calcOperator);
    // }

    // if (currentDisplay !== "") {
    //     calcDisplay.textContent = currentDisplay;
    // } else {
    //     calcDisplay.textContent = "0";
    // }