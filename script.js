// Math functions

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? "error" : a / b;

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
let currentValue = displayValue;
let firstOperand = '0';
let secondOperand = '0';
let operandFlag = true;
let currentOperator;

let operatorForEquals;
let secondOperandForEquals;
let secondOperandFlag = true;

let lastAction;

// Event handlers

const handleButtonClick = function (e) {
    handleInputs(e.target.textContent);
}

const handleInputs = function (btnInput) {
    
    let clickInput = btnInput;

    if (clickInput.match(/[0-9]/g)) {
        if (lastAction === 'inputEquals') {
            inputClear();
        }
        inputNumber(clickInput);
        lastAction = 'inputNumber';
    } else if (clickInput === 'backspace') {
        inputBackspace();
        lastAction = 'inputBackspace';
    } else if (clickInput === 'C') {
        inputClear();
        lastAction = 'inputClear';
    } else if (clickInput === '.' && (!displayValue.match(/\./g))) {
        if (lastAction === 'inputEquals') {
            inputClear();
        }
        inputComma();
        lastAction = 'inputComma';
    } else if (clickInput.match(/[\+\-÷\x]/gi)) {
        if (lastAction === 'inputOperator') {
            currentOperator = clickInput;
        } else {
            inputOperator(clickInput);
        }
        
        lastAction = 'inputOperator';
    } else if (clickInput === '=') {
        secondOperand = currentValue;
        if (lastAction === 'inputEquals') {
            secondOperand = secondOperandForEquals;
            currentOperator = operatorForEquals;
        }
        inputEquals();
        lastAction = 'inputEquals';
    }

    handleDisplay();
}

const inputNumber = (digit) => {

    if (currentValue === '0') {
        currentValue = digit;
    } else {
        currentValue = currentValue + digit;
    }
    
    if (!operandFlag) {
        secondOperandFlag = true;
    }
    displayValue = currentValue;
}

const inputBackspace = () => {
    if (String(currentValue).slice(-1) === ".") { commaKey.disabled = false };
    currentValue = String(currentValue).slice(0, String(currentValue).length - 1);
    if (currentValue === '') { currentValue = '0' }

    displayValue = currentValue;
}

const inputClear = () => {
    displayValue = '0';
    currentValue = '0';
    firstOperand = '0';
    secondOperand = '0';
    currentOperator = null;
    operatorForEquals = null;
    operandFlag = true;
    secondOperandForEquals = null;
    secondOperandFlag = false;
    commaKey.disabled = false;
    buttons.forEach((button) => {
        button.disabled = false;
    })
}

const inputComma = () => {
    currentValue = currentValue + '.';
    commaKey.disabled = true;

    displayValue = currentValue;
}

const inputOperator = (operator) => {
    
    if (operandFlag) {
        firstOperand = displayValue;
        currentOperator = operator;
    } else if (!operandFlag) {
        secondOperandFlag = true;
        secondOperand = displayValue;
    }

    if (!operandFlag && secondOperandFlag) {
        if (currentOperator) {
            currentValue = operate(currentOperator, Number(firstOperand), Number(secondOperand));
            currentOperator = operator;            
        } else {
            currentOperator = operator;
            currentValue = operate(currentOperator, Number(firstOperand), Number(secondOperand));            
        }
        
        displayValue = currentValue;
        firstOperand = currentValue;
        currentValue = '0';
    } else {
        currentValue = secondOperand;
        operandFlag = false;
    
        displayValue = firstOperand;
    }
}

const inputEquals = () => {
    if (!currentOperator && !operatorForEquals) {
        inputClear();
        buttons.forEach((button) => {
            button.disabled = true;
        })
        buttons[0].disabled = false;
        displayValue = 'error';
    } else if (operate(currentOperator, Number(firstOperand), Number(secondOperand)) === "error") {
        inputClear();
        buttons.forEach((button) => {
            button.disabled = true;
        })
        buttons[0].disabled = false;
        displayValue = "NaN";
    } else {
        
        currentValue = operate(currentOperator, Number(firstOperand), Number(secondOperand));

        secondOperandForEquals = secondOperand;
        secondOperand = '0';
        operandFlag = true;
        firstOperand = currentValue;
        operatorForEquals = currentOperator;
        currentOperator = null;

        displayValue = currentValue;
    }
}

const handleDisplay = () => {
    
    displayValue = String(displayValue);
    calcDisplay.textContent = displayValue;
}

// Event listeners

buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
})

// Keyboard support

window.addEventListener('keydown', function(e) {
    
    let aKey = e.key;
    
    if (aKey === "=") {
        aKey = "Enter";
    } else if (aKey === "c" || aKey === "Escape") {
        aKey = "C";
    } else if (aKey === "x" || aKey === "X") {
        aKey = "*";
    } else if (aKey === ",") {
        aKey = ".";
    } else if (aKey === "Delete") {
        aKey = "Backspace";
    }
    
    const buttonKey = document.querySelector(`button[key="${aKey}"]`);
    if (!buttonKey) {
        return;
    } else {
        buttonKey.classList.add('active');
    }
    handleInputs(buttonKey.textContent);
})

window.addEventListener('keyup', function(e) {
    let aKey = e.key;
    
    if (aKey === "=") {
        aKey = "Enter";
    } else if (aKey === "c" || aKey === "Escape") {
        aKey = "C";
    } else if (aKey === "x" || aKey === "X") {
        aKey = "*";
    } else if (aKey === ",") {
        aKey = ".";
    } else if (aKey === "Delete") {
        aKey = "Backspace";
    }
    const buttonKey = document.querySelector(`button[key="${aKey}"]`);
    if (!buttonKey) {
        return;
    } else {
        buttonKey.classList.remove('active');
    }
})

