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
let aValue = ""

const pressedKeys = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "/": "divide",
}

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
    let result = Math.round(num1 / num2 * 100) / 100;
    return result;
};

function operate(operatorFunc, num1, num2) {
    let total = window[operatorFunc](num1, num2);
    display.textContent = total;

    return total;
};


function checkOperator() {
    if (hasOperator || hasTotal) {
        display.textContent = "";
        hasOperator = false;
        hasTotal = false;
    }
    return;
}

function checkInitialDisplay() {
    if ((display.textContent == 0) && initialDisplay) {
        display.textContent = "";
        initialDisplay = false; 
    }
    return;
}

function checkDisplayLength() {
    if (display.textContent.length > 12) {
        return;
    }
}

function calculate(key) {
    if (firstValue && tempValue) {
        firstValue = operate(operatorSymbol, firstValue, tempValue)
        console.log(firstValue)
    }
    else {
        firstValue = tempValue;
        tempValue = 0;
    }
    operatorSymbol = key;
    hasOperator = true;
    return firstValue;
}

function equal(total) {
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


numberKeys.forEach(key => {
    
    key.addEventListener("click", () => {

        // if (hasOperator || hasTotal) {
        //     display.textContent = "";
        //     hasOperator = false;
        //     hasTotal = false;
        // }
        checkOperator();

        // if ((display.textContent == 0) && initialDisplay) {
        //     display.textContent = "";
        //     initialDisplay = false; 
        // }
        checkInitialDisplay();

        // if (display.textContent.length > 12) {
        //     return;
        // }
        checkDisplayLength();
        
        display.textContent += key.textContent;
        tempValue = Number(display.textContent);
        console.log(tempValue)
    });

});

operateKeys.forEach(key => {
    
    key.addEventListener("click", () => {
        // if (firstValue && tempValue) {
        //     firstValue = operate(operatorSymbol, firstValue, tempValue)
        //     console.log(firstValue)
        // }
        // else {
        //     firstValue = tempValue;
        //     tempValue = 0;
        // }
        
        // operatorSymbol = key.classList.item(2);
        // hasOperator = true;
        console.log(key)
        calculate(key.classList.item(2));
    })

})

percentKey.addEventListener("click", () => {

    // if (tempValue === 0) {
    //     display.textContent = 0;
    // }

    // else {
    //     tempValue /= 100;
    //     display.textContent = tempValue;
    //     return tempValue;
    // }
    
    percentage()
});

equalKey.addEventListener("click", () => {

    if (!tempValue && !operatorSymbol) {
        display.textContent = 0;
        return;
    };

    let total = calculate(operatorSymbol);
    
    console.log(total);

    // hasTotal = true;
    // tempValue = total;
    // firstValue = 0;
    equal(total);

    return total;

})

clearKey.addEventListener("click", () => {

    // firstValue = 0;
    // tempValue = 0;
    // operatorSymbol = "";
    // display.textContent = "0";
    // initialDisplay = true;
    clear()
})

backspaceKey.addEventListener("click", () => {

    // tempValue = Number(tempValue.toString().slice(0, -1))
    // display.textContent = tempValue

    // if (tempValue === 0) {
    //     initialDisplay = true
    // }

    // return tempValue
    backspace()
})


window.addEventListener("keydown", (event) => {
    
    if ((event.key >= 0 && event.key <= 9) || event.key == ".") {

        // if (hasOperator) {
        //     display.textContent = ""
        //     hasOperator = false
        // }

        // if ((display.textContent == 0) && initialDisplay) {
        //     display.textContent = ""
        //     initialDisplay = false
        // }

        checkOperator()
        checkInitialDisplay()
        checkInitialDisplay()

        display.textContent += event.key
        tempValue = Number(display.textContent)
        console.log(tempValue)
    }

    if (event.key in pressedKeys) {

        // operatorSymbol = pressedKeys[event.key]
        // console.log(operatorSymbol)

        // if (firstValue && tempValue) {
        //     firstValue = operate(operatorSymbol, firstValue, tempValue)
        //     console.log(firstValue)
        // }

        // console.log(event)
        // firstValue = tempValue
        // hasOperator = true


        let total = calculate(pressedKeys[event.key])

        return total
    }

    switch (event.key) {
        case "=":
        case "Enter" :
            if (!tempValue && !operatorSymbol) {
                display.textContent = 0;
                return;
            };
    
            let total = calculate(pressedKeys[event.key])
            equal(total)
    
            break;
    
        case "Escape" :
            clear()
            break;
        
        case "%":
            percentage()
            break;
    
        case "Backspace":
            backspace()
            break;
        }
    }

    // if (event.key === "=" || event.key === "Enter") {
    //     if (!tempValue && !operatorSymbol) {
    //         display.textContent = 0;
    //         return;
    //     };

    //     let total = calculate(pressedKeys[event.key])
    //     equal(total)

    //     return total
    // }

    // else if (event.key === "Escape") {
    //     clear()
    // }

    // else if (event.key === "%") {
    //     percentage()
    // }

    // else if (event.key === "Backspace") {
    //     backspace()
    // }

)