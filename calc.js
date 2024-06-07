document.addEventListener('DOMContentLoaded', (event) => {

let trailingResult = null;
let operationOptions = ['divide', 'multiply', 'subtract', 'add'];
let workingOperation = "";
let expectingNegativeNumber = false;

function updateDisplay(input) {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");

  console.log("Input:", input);
  console.log("Display before:", display.innerHTML);
  console.log("Trailing result:", trailingResult);
  console.log("Working operation:", workingOperation);
  console.log("Expecting negative number:", expectingNegativeNumber);

  if (operationOptions.indexOf(input) === -1) {
    // Handling numbers and other non-operation inputs
    if (input === "decimal") {
      if (display.innerHTML.indexOf(".") === -1) {
        display.innerHTML += ".";
      }
    } else if (input === "negative-value") {
      if (expectingNegativeNumber) {
        display.innerHTML = "-";
        expectingNegativeNumber = false;
      } else {
        if (display.innerHTML.indexOf("-") === -1) {
          display.innerHTML = "-" + display.innerHTML;
        } else {
          display.innerHTML = display.innerHTML.slice(1);
        }
      }
    } else if (input === "equals") {
      if (workingOperation !== "" && trailingResult !== null) {
        display.innerHTML = calculate(trailingResult, display.innerHTML, workingOperation);
        trailingResult = null;
        workingOperation = "";
        secondaryDisplay.innerHTML = trailingResult;
      }
    } else {
      if (display.innerHTML === "0" || expectingNegativeNumber) {
        display.innerHTML = input;
        expectingNegativeNumber = false;
      } else {
        display.innerHTML += input;
      }
    }
  } else {
    // Handling operations
    if (trailingResult === null) {
      trailingResult = display.innerHTML;
    } else if (workingOperation !== "") {
      trailingResult = calculate(trailingResult, display.innerHTML, workingOperation);
    }
    workingOperation = input;
    secondaryDisplay.innerHTML = trailingResult;
    display.innerHTML = "0";
    if (input === "subtract") {
      expectingNegativeNumber = true;
    } else {
      expectingNegativeNumber = false;
    }
  }

  console.log("Display after:", display.innerHTML);
  console.log("Trailing result after:", trailingResult);
  console.log("Working operation after:", workingOperation);
  console.log("Expecting negative number after:", expectingNegativeNumber);
}

function clearDisplay() {
  let display = document.getElementById("display");
  let secondaryDisplay = document.getElementById("secondaryDisplay");
  trailingResult = null;
  display.innerHTML = "0";
  secondaryDisplay.innerHTML = "";
}

function calculate(firstNumber, secondNumber, operation) {
  let result;
  firstNumber = parseFloat(firstNumber);
  secondNumber = parseFloat(secondNumber);
  switch (operation) {
    case "add":
      result = firstNumber + secondNumber;
      break;
    case "subtract":
      result = firstNumber - secondNumber;
      break;
    case "multiply":
      result = firstNumber * secondNumber;
      break;
    case "divide":
      result = firstNumber / secondNumber;
      break;
    default:
      console.log("Calculate switch statement missed something");
  }
  return result.toString();
}

// Event Listeners for the buttons
document.getElementById("clear").addEventListener("click", clearDisplay);
document.querySelectorAll(".number").forEach(button => {
  button.addEventListener("click", () => updateDisplay(button.innerText));
});
document.querySelectorAll(".operator").forEach(button => {
  button.addEventListener("click", () => updateDisplay(button.dataset.operator));
});
document.getElementById("negative-value").addEventListener("click", () => updateDisplay("negative-value"));
document.getElementById("equals").addEventListener("click", () => updateDisplay("equals"));
document.getElementById("decimal").addEventListener("click", () => updateDisplay("decimal"));

});