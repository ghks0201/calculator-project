const allKeys = document.querySelectorAll(".key");
const numberKeys = document.querySelectorAll(".number");
const operateKeys = document.querySelectorAll(".operator")
const display = document.querySelector(".display");
const equalKey = document.querySelector(".equal");
const clearKey = document.querySelector(".clear");
const percentKey = document.querySelector(".percentage");
const backspaceKey = document.querySelector(".backspace");
const errorMsg = "Error!";

let tempValue = null;
let firstValue = null;
let operatorSymbol = "";
let hasOperator = false;
let hasTotal = false;
let initialDisplay = true;
let aValue = ""
let firstValueEntered = false;

const pressedKeys = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
}

function add(num1, num2) {
    let result = Math.round((num1 + num2) * 10000) / 10000;
    return result;
};

function subtract(num1, num2) {
    let result = Math.round((num1 - num2) * 10000) / 10000;
    return result;
};

function multiply(num1, num2) {
    let result = Math.round((num1 * num2) * 10000) / 10000;
    return result;
};

function divide(num1, num2) {
    if (num2 === 0) {
        return errorMsg;
    }
    else {
        let result = Math.round(num1 / num2 * 10000) / 10000;
        return result;
    }
    
};

function operate(operatorFunc, num1, num2) {
    let total = window[operatorFunc](num1, num2);
    display.textContent = total;

    return total;
};

// Check if there is previous operator or has total calculated, if yes then clear the display
function checkOperator() {
    if (hasOperator || hasTotal) {
        display.textContent = "";
        hasOperator = false;
        hasTotal = false;
    }
    return;
}

// Check if the initial display is 0, if yes then clear the display
function checkInitialDisplay() {
    if ((display.textContent == 0) && initialDisplay) {
        display.textContent = "";
        initialDisplay = false; 
    }
    return;
}

// Check if display length is more than 12
function checkDisplayLength(num) {
    if (display.textContent.length >= 12) {
        return;
    }

    if (display.textContent.length >= 1) {
        if (num == 0 && display.textContent[0] == 0) {
            return;
        }
        else {
            display.textContent += num;
            tempValue = Number(display.textContent);
        }
    }
    else {
        display.textContent += num;
        tempValue = Number(display.textContent);
    }

}

// Function to pass in values and operator symbol to carry out calculations
function calculate(key) {
    if (firstValue && tempValue) {
        firstValue = operate(operatorSymbol, firstValue, tempValue)   
    }

    else if ((firstValue === 0 || tempValue === 0) && firstValueEntered) {
        firstValue = operate(operatorSymbol, firstValue, tempValue) 
        firstValueEntered = false
    }

    else {
        firstValue = tempValue;
        tempValue = null;
        firstValueEntered = true
    }

    operatorSymbol = key;
    hasOperator = true;
    return firstValue;
}

// Clear previous value when equal sign selected
function clearEqual(total) {
    hasTotal = true;
    tempValue = total;
    firstValue = 0;
}

function percentage() {
    if (tempValue === 0) {
        display.textContent = 0;
    }

    else {
        tempValue /= 100;
        display.textContent = tempValue;
        return tempValue;
    }
}

// Clear display when esc selected
function clear() {
    firstValue = 0;
    tempValue = 0;
    operatorSymbol = "";
    display.textContent = "0";
    initialDisplay = true;
}

function backspace() {
    tempValue = Number(tempValue.toString().slice(0, -1))
    display.textContent = tempValue

    if (tempValue === 0) {
        initialDisplay = true
    }

    return tempValue
}

function animation(key) {
    key.classList.add("clicked")

    setTimeout(function() {
        key.classList.remove("clicked")
    }, 100)
}

allKeys.forEach(key => {
    key.addEventListener("click", () => {
        animation(key)
    })
})


numberKeys.forEach(key => {
    
    key.addEventListener("click", () => {
        checkOperator();
        checkInitialDisplay();
        checkDisplayLength(key.textContent);
    
        if (display.textContent.includes(".")) {
            document.getElementsByClassName("decimal")[0].disabled = true;
        }
        else {
            document.getElementsByClassName("decimal")[0].disabled = false;
        }
        
    });

});

operateKeys.forEach(key => {
    
    key.addEventListener("click", () => {
        calculate(key.classList.item(2));
    })

})

equalKey.addEventListener("click", () => {

    if (!tempValue && !operatorSymbol) {
        display.textContent = 0;
        return;
    };

    let total = calculate(operatorSymbol);
    clearEqual(total);

    return total;

})

percentKey.addEventListener("click", () => {
    percentage()
});

clearKey.addEventListener("click", () => {
    clear()
})

backspaceKey.addEventListener("click", () => {
    backspace()
})


window.addEventListener("keydown", (event) => {

    if ((event.key >= 0 && event.key <= 9) || event.key == ".") {
        checkOperator()
        checkInitialDisplay()

        let selectedKey = event.key
        
        for (let i = 0; i < allKeys.length; i++) {
            if (selectedKey == allKeys[i].textContent) {
                animation(allKeys[i])
            }
        }

        if (display.textContent.includes(".")) {
            if (event.key == ".") {
                display.textContent += ""
                return
            }
            else {
                checkDisplayLength(event.key)
                animation(document.querySelector(".decimal"))
                return
            }
            
        }

        checkDisplayLength(event.key);
    }

    if (event.key in pressedKeys) {
        let total = calculate(pressedKeys[event.key])

        for (let i = 0; i < operateKeys.length; i++) {
            if (event.key === operateKeys[i].textContent) {
                animation(operateKeys[i])
            }
        }
        return total
    }

    switch (event.key) {
        case "=":
        case "Enter" :
            if (!tempValue && !operatorSymbol) {
                display.textContent = 0;
                animation(equalKey)
                return;
            };
    
            let total = calculate(pressedKeys[event.key])
            animation(equalKey)
            clearEqual(total)
    
            break;
    
        case "Escape" :
            clear()
            animation(clearKey)
            break;
        
        case "%":
            percentage()
            animation(percentKey)
            break;
    
        case "Backspace":
            backspace()
            animation(backspaceKey)
            break;
        }
    }

)