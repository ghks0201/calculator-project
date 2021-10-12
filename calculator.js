const numberKeys = document.querySelectorAll(".number");
const operateKeys = document.querySelectorAll(".operator")
const display = document.querySelector(".display");
const equalKey = document.querySelector(".equal");
const clearKey = document.querySelector(".clear");
const percentKey = document.querySelector(".percentage");
const backspaceKey = document.querySelector(".backspace");

let tempValue = 0;
let firstValue = 0;
let operatorSymbol = "";
let hasOperator = false;
let hasTotal = false;
let initialDisplay = true;


function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    if (num2 === 0) {
        const errorMsg = "Error!";
        return errorMsg;
    }
    return Math.round(num1 / num2 * 100) / 100;
};

function operate(operatorFunc, num1, num2) {
    let total = window[operatorFunc](num1, num2);
    display.textContent = total;

    return total;
};


numberKeys.forEach(key => {
    
    key.addEventListener("click", () => {

        if (hasOperator || hasTotal) {
            display.textContent = "";
            hasOperator = false;
            hasTotal = false;
        }

        if ((display.textContent == 0) && initialDisplay) {
            display.textContent = "";
            initialDisplay = false; 
        }

        if (display.textContent.length > 12) {
            return;
        }
        
        display.textContent += key.textContent;
        tempValue = Number(display.textContent);
        console.log(tempValue)
    });

});

operateKeys.forEach(key => {
    
    key.addEventListener("click", () => {
        if (firstValue && tempValue) {
            firstValue = operate(operatorSymbol, firstValue, tempValue)
            console.log(firstValue)
        }
        else {
            firstValue = tempValue;
            tempValue = 0;
        }
        
        operatorSymbol = key.classList.item(2);
        hasOperator = true;
    })

})

percentKey.addEventListener("click", () => {

    if (tempValue === 0) {
        display.textContent = 0;
    }

    else {
        tempValue /= 100;
        display.textContent = tempValue;
        return tempValue;
    }
    
});

equalKey.addEventListener("click", () => {

    if (!tempValue && !operatorSymbol) {
        display.textContent = 0;
        return;
    };

    let total = operate(operatorSymbol, firstValue, tempValue);
    
    console.log(total);

    hasTotal = true;
    tempValue = total;
    firstValue = 0;
    return total;

})

clearKey.addEventListener("click", () => {

    firstValue = 0;
    tempValue = 0;
    operatorSymbol = "";
    display.textContent = "0";
    initialDisplay = true;

})

backspaceKey.addEventListener("click", () => {

    tempValue = Number(tempValue.toString().slice(0, -1))
    display.textContent = tempValue

    if (tempValue === 0) {
        initialDisplay = true
    }

    return tempValue

})