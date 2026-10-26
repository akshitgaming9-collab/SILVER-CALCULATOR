```javascript
const display = document.querySelector(".DISPLAY");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

// Update calculator display
function updateDisplay() {
    display.textContent = currentInput;
}

// Calculate result
function calculate() {
    if (previousInput === null || operator === null) {
        return;
    }

    const first = Number(previousInput);
    const second = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = first + second;
            break;

        case "−":
            result = first - second;
            break;

        case "×":
            result = first * second;
            break;

        case "÷":
            if (second === 0) {
                currentInput = "Error";
                previousInput = null;
                operator = null;
                shouldResetDisplay = true;
                updateDisplay();
                return;
            }

            result = first / second;
            break;

        default:
            return;
    }

    currentInput = Number.isFinite(result)
        ? String(Number(result.toPrecision(12)))
        : "Error";

    previousInput = null;
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}

// Handle button animations
function animateButton(selectedButton) {
    buttons.forEach(function (button) {
        button.classList.remove("selected", "shrunk");

        if (button !== selectedButton) {
            button.classList.add("shrunk");
        }
    });

    selectedButton.classList.add("selected");
}

// Handle calculator buttons
buttons.forEach(function (