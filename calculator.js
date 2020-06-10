let calcTracker = 0;
let dotTracker = 0;
// To add commas
// (1234567.89).toLocaleString('en')
// add a backspace button or clear button
// take away dottracker
// refactor code
// can still add number after = button

// when calc has been pressed
// calcTracker --> 1
// 0 has not clicked calculate
// 1 has clicked calculate
let displayBox = document.querySelector("#displayBox");
let dotButton = document.querySelector("#dotButton");
function clear() {
  dotButton.classList.remove("disableButton");
  displayBox.textContent = "";
}
function handleDotClick(e) {
  // still contains multiple dots in screen if toggle between =
  // if dot exitsts already don't add more dots
  dotButton.classList.toggle("disableButton");
  let dot = e.target.textContent;
  if (displayBox.textContent.indexOf(".") - 1 === ".") {
    null;
  } else {
    displayBox.textContent = displayBox.textContent + dot;
  }
  // add disable class to my dotButton
}

function handleNumClick(e) {
  // check to see if display has numbers already
  let userNum = e.target.textContent;
  // let displayN = document.querySelector("#displayBox");
  if (calcTracker === 1) {
    clear();
    calcTracker--;
  }
  // if calculator on do something
  if (displayBox.textContent === "0") {
    displayBox.textContent = userNum;
  } else if (displayBox.textContent.length >= 1) {
    displayBox.textContent = displayBox.textContent + userNum;
  } else {
    displayBox.textContent = userNum;
  }
  // if off then buttons won't work, "null"
}
function handleOperationClick(e) {
  dotButton.classList.toggle("disableButton");
  let operation = e.target.textContent;

  // ++ is a no, there has to be content first, no 2 ++ inside string
  if (
    displayBox.textContent.length >= 1 &&
    displayBox.textContent.indexOf(operation) === -1 &&
    displayBox.textContent.indexOf("×") === -1 &&
    displayBox.textContent.indexOf("+") === -1 &&
    displayBox.textContent.indexOf("−") === -1 &&
    displayBox.textContent.indexOf("÷") === -1
  ) {
    displayBox.textContent = displayBox.textContent + " " + operation + " ";
  } else {
    null;
  }
}
function handleCalc() {
  dotButton.classList.toggle("disableButton");

  let arr = displayBox.textContent.split(" ");
  let operation = arr[1];
  let num1 = arr[0] * 1;
  let num2 = arr[2] * 1;
  let newString = "";
  //   copy and paste the symbol from the console into the if statements
  if (operation === "×") {
    newString = newString + num1 * num2;
  } else if (operation === "+") {
    newString = newString + (num1 + num2);
  } else if (operation === "−") {
    newString = newString + (num1 - num2);
  } else {
    newString = newString + num1 / num2;
  }
  // let displayBox = document.querySelector("#displayBox");
  if (arr.length === 3) {
    displayBox.textContent = newString;
  } else {
    null;
  }
  calcTracker++;
}
document.querySelector("#resetButton").addEventListener("click", clear);
document.querySelector("#calcButton").addEventListener("click", handleCalc);
document.querySelector("#dotButton").addEventListener("click", handleDotClick);
let numbers = document.querySelectorAll(".number");
for (number of numbers) {
  number.addEventListener("click", handleNumClick);
}

let operations = document.querySelectorAll(".operation");
for (operation of operations) {
  operation.addEventListener("click", handleOperationClick);
}
