
const display = document.querySelector(".DISPLAY");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "0";
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

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
        case "-":
            result = first - second;
            break;

        case "×":
        case "*":
            result = first * second;
            break;

        case "÷":
        case "/":
            if (second === 0) {
                currentInput = "Cannot divide by zero";
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

    currentInput = String(
        Number.isFinite(result)
            ? Number(result.toPrecision(12))
            : "Error"
    );

    previousInput = null;
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}

buttons.forEach(function(button) {
    button.addEventListener("click", function() {
        const value = button.textContent.trim();

        // Keep the selected-button animation
        buttons.forEach(function(otherButton) {
            otherButton.classList.remove("selected", "shrunk");
        });

        button.classList.add("selected");

        buttons.forEach(function(otherButton) {
            if (otherButton !== button) {
                otherButton.classList.add("shrunk");
            }
        });

        // Clear everything
        if (value === "AC") {
            currentInput = "0";
            previousInput = null;
            operator = null;
            shouldResetDisplay = false;
            updateDisplay();
            return;
        }

        // Delete the last digit
        if (value === "DEL") {
            if (shouldResetDisplay) {
                currentInput = "0";
                shouldResetDisplay = false;
            } else if (currentInput.length > 1) {
                currentInput = currentInput.slice(0, -1);

                if (currentInput === "-") {
                    currentInput = "0";
                }
            } else {
                currentInput = "0";
            }

            updateDisplay();
            return;
        }

        // Percentage
        if (value === "%") {
            currentInput = String(Number(currentInput) / 100);
            updateDisplay();
            return;
        }

        // Decimal point
        if (value === ".") {
            if (shouldResetDisplay) {
                currentInput = "0";
                shouldResetDisplay = false;
            }

            if (!currentInput.includes(".")) {
                currentInput += ".";
            }

            updateDisplay();
            return;
        }

        // Mathematical operators
        if (["+", "−", "-", "×", "*", "÷", "/"].includes(value)) {
            if (operator !== null && !shouldResetDisplay) {
                calculate();
            }

            previousInput = currentInput;
            operator = value;
            shouldResetDisplay = true;
            return;
        }

        // Equals
        if (value === "=") {
            calculate();
            return;
        }

        // Number buttons
        if (/^\d+$/.test(value)) {
            if (shouldResetDisplay || currentInput === "0") {
                currentInput = value;
                shouldResetDisplay = false;
            } else {
                currentInput += value;
            }

            updateDisplay();
        }
    });
});

updateDisplay();
