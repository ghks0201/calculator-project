const allKeys = document.querySelectorAll(".key");
const numberKeys = document.querySelectorAll(".number");
const operateKeys = document.querySelectorAll(".operator");
const previousDisplay = document.querySelector(".previous-display");
const currentDisplay = document.querySelector(".current-display");
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
let displayText = "";
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
    console.log(operatorFunc)
    if (operatorFunc != "equal") {
        let total = window[operatorFunc](num1, num2);
        console.log(total)
        currentDisplay.textContent = total;

        return total;
    }
    
};

// Check if there is previous operator or has total calculated, if yes then clear the currentDisplay
function checkOperator() {
    if (hasOperator || hasTotal) {
        currentDisplay.textContent = "";
        hasOperator = false;
        hasTotal = false;
    }
    return;
}

// Check if the initial currentDisplay is 0, if yes then clear the currentDisplay
function checkInitialDisplay() {
    if ((currentDisplay.textContent == 0) && initialDisplay) {
        currentDisplay.textContent = "";
        initialDisplay = false; 
    }
    return;
}

// Check if currentDisplay length is more than 12
function checkDisplayLength(num) {
    if (currentDisplay.textContent.length >= 12) {
        return;
    }

    if (currentDisplay.textContent.length >= 1) {
        if (num == 0 && currentDisplay.textContent[0] == 0) {
            return;
        }
        else {
            currentDisplay.textContent += num;
            tempValue = Number(currentDisplay.textContent);
        }
    }
    else {
        currentDisplay.textContent += num;
        tempValue = Number(currentDisplay.textContent);
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
    console.log(operatorSymbol)
    firstValue = 0;
}

function percentage() {
    if (tempValue === 0) {
        currentDisplay.textContent = 0;
    }

    else {
        tempValue /= 100;
        currentDisplay.textContent = tempValue;
        return tempValue;
    }
}

// Clear currentDisplay when esc selected
function clear() {
    firstValue = 0;
    tempValue = 0;
    operatorSymbol = "";
    previousDisplay.textContent = "";
    currentDisplay.textContent = "0";
    initialDisplay = true;
}

function backspace() {
    tempValue = Number(tempValue.toString().slice(0, -1))
    currentDisplay.textContent = tempValue

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
    
        if (currentDisplay.textContent.includes(".")) {
            document.getElementsByClassName("decimal")[0].disabled = true;
        }
        else {
            document.getElementsByClassName("decimal")[0].disabled = false;
        }
        
    });

});

operateKeys.forEach(key => {
    
    key.addEventListener("click", () => {
        
        previousDisplay.textContent += `${tempValue} ${key.textContent} `
        calculate(key.classList.item(2));
    })

})

equalKey.addEventListener("click", () => {

    if (!tempValue && !operatorSymbol) {
        currentDisplay.textContent = 0;
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

        if (currentDisplay.textContent.includes(".")) {
            if (event.key == ".") {
                currentDisplay.textContent += ""
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
                currentDisplay.textContent = 0;
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