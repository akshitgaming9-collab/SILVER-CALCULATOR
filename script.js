```javascript
document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector(".DISPLAY");
    const buttons = document.querySelectorAll(".buttons button");

    if (!display || buttons.length === 0) {
        console.error("Calculator elements not found!");
        return;
    }

    let current = "0";
    let previous = null;
    let operator = null;
    let reset = false;

    function update() {
        display.textContent = current;
    }

    function calculate() {
        if (previous === null || operator === null) return;

        const a = Number(previous);
        const b = Number(current);
        let result;

        switch (operator) {
            case "+": result = a + b; break;
            case "−": result = a - b; break;
            case "×": result = a * b; break;
            case "÷":
                if (b === 0) {
                    current = "Error";
                    previous = null;
                    operator = null;
                    reset = true;
                    update();
                    return;
                }
                result = a / b;
                break;
        }

        current = Number.isFinite(result)
            ? String(Number(result.toPrecision(12)))
            : "Error";

        previous = null;
        operator = null;
        reset = true;
        update();
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            const value = button.textContent.trim();

            // Button animation
            buttons.forEach(function (other) {
                other.classList.remove("selected", "shrunk");
                if (other !== button) other.classList.add("shrunk");
            });
            button.classList.add("selected");

            if (value === "AC") {
                current = "0";
                previous = null;
                operator = null;
                reset = false;
                update();
                return;
            }

            if (value === "DEL") {
                if (reset || current === "Error") {
                    current = "0";
                    reset = false;
                } else {
                    current = current.slice(0, -1) || "0";
                    if (current === "-") current = "0";
                }
                update();
                return;
            }

            if (value === "%") {
                if (current !== "Error") {
                    current = String(Number(current) / 100);
                    update();
                }
                return;
            }

            if (value === ".") {
                if (reset || current === "Error") {
                    current = "0";
                    reset = false;
                }
                if (!current.includes(".")) current += ".";
                update();
                return;
            }

            if (["+", "−", "×", "÷"].includes(value)) {
                if (current === "Error") return;
                if (operator !== null && !reset) calculate();

                previous = current;
                operator = value;
                reset = true;
                return;
            }

            if (value === "=") {
                calculate();
                return;
            }

            if (/^\d+$/.test(value)) {
                if (reset || current === "0" || current === "Error") {
                    current = value;
                    reset = false;
                } else {
                    current += value;
                }
                update();
            }
        });
    });

    update();
    console.log("Calculator ready:", buttons.length, "buttons");
});
```