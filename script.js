    
document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector(".DISPLAY");
    const buttons = document.querySelectorAll(".buttons button");

    let current = "0";
    let firstNumber = null;
    let operator = null;
    let resetDisplay = false;

    function updateDisplay() {
        display.textContent = current;
    }

    function calculate() {
        if (firstNumber === null || operator === null) return;

        const a = Number(firstNumber);
        const b = Number(current);
        let result;

        if (operator === "+") result = a + b;
        else if (operator === "−") result = a - b;
        else if (operator === "×") result = a * b;
        else if (operator === "÷") {
            if (b === 0) {
                current = "Error";
                firstNumber = null;
                operator = null;
                resetDisplay = true;
                updateDisplay();
                return;
            }
            result = a / b;
        }

        current = Number.isFinite(result)
            ? String(Number(result.toPrecision(12)))
            : "Error";

        firstNumber = null;
        operator = null;
        resetDisplay = true;
        updateDisplay();
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const value = button.textContent.trim();

            // Keep button animations
            buttons.forEach(function (other) {
                other.classList.remove("selected", "shrunk");
                if (other !== button) other.classList.add("shrunk");
            });
            button.classList.add("selected");

            if (value === "AC") {
                current = "0";
                firstNumber = null;
                operator = null;
                resetDisplay = false;
            } else if (value === "DEL") {
                current = resetDisplay ? "0" : current.slice(0, -1) || "0";
                resetDisplay = false;
            } else if (value === "%") {
                current = String(Number(current) / 100);
            } else if (value === ".") {
                if (resetDisplay || current === "Error") {
                    current = "0";
                    resetDisplay = false;
                }
                if (!current.includes(".")) current += ".";
            } else if (["+", "−", "×", "÷"].includes(value)) {
                if (current === "Error") return;

                if (operator !== null && !resetDisplay) calculate();

                firstNumber = current;
                operator = value;
                resetDisplay = true;
            } else if (value === "=") {
                calculate();
            } else if (/^\d+$/.test(value)) {
                if (resetDisplay || current === "Error" || current === "0") {
                    current = value;
                    resetDisplay = false;
                } else {
                    current += value;
                }
            }

            updateDisplay();
        });
    });

    updateDisplay();
});
```