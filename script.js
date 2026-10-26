console.log("NEW SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector(".DISPLAY");
    const buttons = document.querySelectorAll(".buttons button");

    console.log("Display found:", display);
    console.log("Buttons found:", buttons.length);

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            display.textContent = button.textContent;
        });
    });
});