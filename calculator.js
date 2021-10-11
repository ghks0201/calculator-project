const numberKeys = document.querySelectorAll(".number");
const operateKeys = document.querySelectorAll(".operator")
const display = document.querySelector(".display");
const equalKey = document.querySelector(".equal");

let tempValue, firstValue = 0;
let operatorSymbol = "";
let hasOperator = false;
let hasTotal = false;


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
    return num1 / num2;
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
        
        display.textContent += key.textContent;
        tempValue = parseInt(display.textContent);
    });

});

operateKeys.forEach(key => {
    
    key.addEventListener("click", () => {
        firstValue = tempValue;
        operatorSymbol = key.classList.item(2);
        hasOperator = true;
    })

})

equalKey.addEventListener("click", () => {
    operate(operatorSymbol, firstValue, tempValue)

    hasTotal = true
    firstValue, tempValue = 0
})