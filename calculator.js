let calcTracker = 0;
let onTracker = 0;
// when calc has been pressed
// calcTracker --> 1
// 0 has not clicked calculate
// 1 has clicked calculate

function handleToggle() {
  let textContent = document.querySelector("#displayBox").textContent;
  //   if turned On and has content then turn off
  if (textContent.length > 0) {
    document.querySelector("#displayBox").textContent = "";
    onTracker--;
    // if turned off and no content then turn on with "0"
  } else if (textContent.length === 0) {
    document.querySelector("#displayBox").textContent = "0";
    onTracker++;
  }
}
function reset() {
  document.querySelector("#displayBox").textContent = "";
}

function handleNumClick(e) {
  // check to see if display has numbers already
  let userNum = e.target.textContent;
  let displayNumber = document.querySelector("#displayBox");
  if (calcTracker === 1) {
    reset();
    calcTracker--;
  }
  // if off then buttons won't work, "null"
  if (onTracker === 0) {
    null;
  } else {
    if (displayNumber.textContent.length >= 1) {
      displayNumber.textContent = displayNumber.textContent + userNum;
    } else {
      displayNumber.textContent = userNum;
    }
  }
}
function handleOperationClick(e) {
  let operation = e.target.textContent;
  displayOperation = document.querySelector("#displayBox");
  // ++ is a no, there has to be content first, no 2 ++ inside string
  if (displayOperation.textContent.length >= 1) {
    displayOperation.textContent =
      displayOperation.textContent + " " + operation + " ";
  } else {
    null;
  }
}
function handleCalc() {
  let string = document.querySelector("#displayBox").textContent;
  let arr = string.split(" ");
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
  let displayBox = document.querySelector("#displayBox");
  displayBox.textContent = newString;
  calcTracker++;
}
document.querySelector("#onButton").addEventListener("click", handleToggle);
document.querySelector("#calcButton").addEventListener("click", handleCalc);
let numbers = document.querySelectorAll(".number");
for (number of numbers) {
  number.addEventListener("click", handleNumClick);
}

let operations = document.querySelectorAll(".operation");
for (operation of operations) {
  operation.addEventListener("click", handleOperationClick);
}

// the + will be the break between num1 and num2
// capture the whole string and send it to function =
