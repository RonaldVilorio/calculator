let calcTracker = 0;
let dotTracker = 0;

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
  calcTracker = 0;
}
function handleDotClick(e) {
  // before the dot or after the dot, there has to be a number
  // before operator check that side for only . dot
  let dot = e.target.textContent;
  let lastInput = displayBox.textContent[displayBox.textContent.length - 1];

  if (lastInput === ".") {
    null;
  } else if (calcTracker === 1) {
    // displayBox.textContent = dot;
    // calcTracker = 0;
  } else {
    displayBox.textContent = displayBox.textContent + dot;
  }

  // add disable class to my dotButton
  dotButton.classList.toggle("disableButton");
}

function handleNumClick(e) {
  // check to see if display has numbers already
  let userNum = e.target.textContent;
  // check for operators by *1 if true then don't reset calc
  // check when starting
  // two phases
  // when calculator on or off

  // lastInput for single numbers is looking at the input before and theres nothing there
  // check the length of the input, if its greater than 2 --> lastInput works
  // since calcTracker is being set to 0 every time a num is clicked, we will weork
  // with the 0 if statements

  let lastChar = false;
  let userInput = displayBox.textContent;
  if (userInput.length >= 2) {
    lastChar = displayBox.textContent[displayBox.textContent.length - 2] * 1;
  }
  if (userInput === "") {
    displayBox.textContent = displayBox.textContent + userNum;
  } else if (calcTracker === 1) {
    if (displayBox.textContent === "0" || userInput.length == 1 || lastChar) {
      console.log("HIIIII");
      displayBox.textContent = userNum;
    } else {
      console.log("bad");
      displayBox.textContent = displayBox.textContent + userNum;
    }
  } else if (calcTracker === 0) {
    displayBox.textContent = displayBox.textContent + userNum;
  }
  calcTracker = 0;
}
function handleOperationClick(e) {
  dotButton.classList.toggle("disableButton");
  let operation = e.target.textContent;
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
  if (displayBox.textContent === "") {
    return null;
  }
  calcTracker++;
  dotButton.classList.toggle("disableButton");

  let arr = displayBox.textContent.split(" ");

  let operation = arr[1];
  let num1 = arr[0] * 1;
  let num2 = arr[2] * 1;
  let solution = 0;
  //   copy and paste the symbol from the console into the if statements
  if (operation === "×") {
    solution = solution + num1 * num2;
  } else if (operation === "+") {
    solution = solution + (num1 + num2);
  } else if (operation === "−") {
    solution = solution + (num1 - num2);
  } else {
    solution = solution + num1 / num2;
  }
  solution = solution.toLocaleString("en");
  // if user gave me 2 nums and a operator, perform the calculation else don't
  // 0 evaulates to false and wouldn't execute the if statement
  if ((arr.length === 3 && num1 && num2) || num1 == 0 || num2 == 0) {
    displayBox.textContent = solution;
  } else {
    null;
  }
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
