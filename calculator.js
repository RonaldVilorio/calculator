// What can be improved (future features)
// What was challenging and how did you overcome it?
// How fluent are you speaking about your own code?
// What resources were helpful for you?

// cut out trailing zero in num2
// cut out commas when redoing math ex: 8,756 - 5667

let calcTracker = 0;
let negTracker = 0;
let allButtons = document.querySelectorAll("button");
let displayBox = document.querySelector("#displayBox");
let dotButton = document.querySelector("#dotButton");
let negButton = document.querySelector("#toggleNeg");
let numbers = document.querySelectorAll(".number");
let operations = document.querySelectorAll(".operation");

// helper functions
function findOperator() {
  let arr = displayBox.textContent.split("");
  let operator = "";
  for (char of arr) {
    if (char === "×") {
      operator = operator + char;
    } else if (char === "+") {
      operator = operator + char;
    } else if (char === "−") {
      operator = operator + char;
    } else if (char === "÷") {
      operator = operator + char;
    } else if (char === "%") {
      operator = operator + char;
    }
  }
  return operator.trim();
}
function hasOperator() {
  return (
    displayBox.textContent.indexOf("×") > -1 ||
    displayBox.textContent.indexOf("+") > -1 ||
    displayBox.textContent.indexOf("−") > -1 ||
    displayBox.textContent.indexOf("÷") > -1 ||
    displayBox.textContent.indexOf("%") > -1
  );
}
function removeCommas(strNum) {
  let newString = "";
  for (let char of strNum) {
    if (char !== ",") {
      newString = newString + char;
    }
  }
  return newString;
}
// ------->

function clear() {
  dotButton.classList.remove("disableButton");
  displayBox.textContent = "";
  calcTracker = 0;
  negTracker = 0;
}
function handleDotClick() {
  let dot = ".";
  let dotCount = 0;
  // will check to see if last char is a dot, we can't have .. when user presses an operator
  let lastChar;
  if(hasOperator()){
    lastChar = displayBox.textContent[displayBox.textContent.length-1]
  }
  
  for (char of displayBox.textContent) {
    if (char === dot) {
      dotCount++;
    }
  }
  if (dotCount >= 2 || lastChar === ".") {
    return null;
    // if a dot is clicked right after equals button, will replace previous solution with .
  } else if (calcTracker === 1 && displayBox.textContent.length >=1) {
    displayBox.textContent = ".";
  } else {
    displayBox.textContent = displayBox.textContent + dot;
  }
  // disable the dot button after using it
  dotButton.classList.add("disableButton");
}

function handleNumClick(e) {
  let userNum = e.target.textContent;
  let operator;
  calcTracker === 1 ? (operator = findOperator()) : null;

  if (calcTracker === 1) {
    if (operator === "" && displayBox.textContent[0] != ".") {
      displayBox.textContent = userNum;
    } else {
      displayBox.textContent = displayBox.textContent + userNum;
    }
    // else calcTracker === 0
  } else {
    displayBox.textContent = displayBox.textContent + userNum;
  }
  calcTracker = 0;
}

function handleOperationClick(e) {
  dotButton.classList.remove("disableButton");
  let userOperator = e.target.textContent;

  if (hasOperator()) {
    let lastOperator = findOperator();
    // replace the current char op with the new one the user clicked on
    displayBox.textContent = displayBox.textContent.replace(
      lastOperator,
      userOperator
    );
  } else if (displayBox.textContent.length >= 1) {
    // set an operator in the text
    // follow up call of the function will go into the first if statement
    displayBox.textContent = displayBox.textContent + " " + userOperator + " ";
  }
  negTracker = 0;
}

function handleCalc() {
  calcTracker = 1;
  negTracker = 0;
  dotButton.classList.remove("disableButton");

  let arr = displayBox.textContent.split(" ");
  let num1;
  if (arr[0].indexOf(",") > -1) {
    num1 = removeCommas(arr[0]) * 1;
  } else {
    num1 = arr[0] * 1;
  }
  let num2 = arr[2]*1
  let operation = arr[1];
  let solution = 0;
  if (operation === "×") {
    solution = solution + num1 * num2;
  } else if (operation === "+") {
    solution = solution + (num1 + num2);
  } else if (operation === "−") {
    solution = solution + (num1 - num2);
  } else if (operation === "%") {
    solution = solution + (num1 % num2);
  } else {
    solution = solution + num1 / num2;
  }
  solution = solution.toLocaleString("en");
  // if user gave me 2 nums and a operator, perform the calculation else don't
  // 0 evaulates to false and wouldn't execute the if statement check for 0
  if (displayBox.textContent === "") {
    null;
  } else if ((arr.length === 3 && num1 && num2) || num1 == 0 || num2 == 0) {
    displayBox.textContent = solution;
  }
}
function toggleNeg() {
  let operator = findOperator();
  let arr = displayBox.textContent.split("");

  if (negTracker === 0 && displayBox.textContent.indexOf(operator)) {
    arr.splice(arr.indexOf(operator) + 2, 0, "-");
    displayBox.textContent = arr.join("");
    negTracker++;
  } else if (negTracker === 0 && operator === "") {
    arr.splice(0, 0, "-");
    displayBox.textContent = arr.join("");
    negTracker++;
  } else if (negTracker === 1 && displayBox.textContent.indexOf(operator)) {
    // remove the - from the second num
    arr.splice(arr.indexOf(operator) + 2, 1, "");
    displayBox.textContent = arr.join("");
    negTracker = 0;
  } else {
    // remove the - from the first num
    displayBox.textContent = displayBox.textContent.replace("-", "");
    negTracker = 0;
  }
}
function handleDelete() {
  if (displayBox.textContent[displayBox.textContent.length - 1] === " ") {
    displayBox.textContent = displayBox.textContent.slice(0, -2);
  } else {
    displayBox.textContent = displayBox.textContent.slice(0, -1);
  }
}

function addAllEventListeners(buttons) {
  for (button of buttons) {
    if (button.className.indexOf("number") > -1) {
      button.addEventListener("click", handleNumClick);
    } else if (button.className.indexOf("operation") > -1) {
      button.addEventListener("click", handleOperationClick);
    }
  }
  document
    .querySelector("#deleteButton")
    .addEventListener("click", handleDelete);
  document.querySelector("#resetButton").addEventListener("click", clear);
  document.querySelector("#calcButton").addEventListener("click", handleCalc);
  document
    .querySelector("#dotButton")
    .addEventListener("click", handleDotClick);
  document.querySelector("#toggleNeg").addEventListener("click", toggleNeg);
}
addAllEventListeners(allButtons);
