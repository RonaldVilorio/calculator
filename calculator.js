let calcTracker = 0;
let negTracker = 0;

// refactor code
// no trailing dots
// having trouble on the operation change after calculate is pressed when dealing with 2 digit numbers
// having trouble with the operation change after pressing . on second num and trying to change operator

// when calc has been pressed
// calcTracker --> 1
// 0 has not clicked calculate
// 1 has clicked calculate
let displayBox = document.querySelector("#displayBox");
let dotButton = document.querySelector("#dotButton");
let negButton = document.querySelector("#toggleNeg");

// have a container for num1
// have a container for num2
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
    }
  }
  return operator.trim();
}

function clear() {
  dotButton.classList.remove("disableButton");
  displayBox.textContent = "";
  calcTracker = 0;
  negTracker = 0;
}
function handleDotClick() {
  let dot = ".";
  let lastInput = displayBox.textContent[displayBox.textContent.length - 1];
  let dotCount = 0;
  for (char of displayBox.textContent) {
    if (char === dot) {
      dotCount++;
    }
  }
  if (lastInput === "." || dotCount > 2) {
    return null;
  } else if (calcTracker === 1 && lastInput.length >= 0) {
    displayBox.textContent = ".";
  } else {
    displayBox.textContent = displayBox.textContent + dot;
  }
  // disable the dot button after using it
  dotButton.classList.add("disableButton");
}

function handleNumClick(e) {
  let userNum = e.target.textContent;
  let lastChar = false;
  // will check for empty string before ex: 5 + _   <-- messes up this part
  // on hold will elaborate further
  if (displayBox.textContent.length >= 2) {
    lastChar = displayBox.textContent[displayBox.textContent.length - 2] * 1;
  }
  // lastChar does 2 things, checks to see if its a number
  // checks if it's a non number such as whitespace
  // if lastChar is number -> replace the num --> if whitespace then add to the userInput

  let userInput = displayBox.textContent;
  // displayBox.textContent === "0" ||
  // userInput.length == 1 ||
  // lastChar === "."
  if (userInput === "") {
    displayBox.textContent = displayBox.textContent + userNum;
  } else if (calcTracker === 1) {
    // check for . and add on to it if equals button was pressed
    if (displayBox.textContent[displayBox.textContent.indexOf(".")] === ".") {
      displayBox.textContent = displayBox.textContent + userNum;
      //  reset every char if there's no whitespace
    } else if (
      displayBox.textContent.length >= 1 &&
      displayBox.textContent.indexOf(" ") == -1
    ) {
      console.log("Hey");
      displayBox.textContent = userNum;
      // there is white space then operator is pressed and add on the string
    } else {
      displayBox.textContent = displayBox.textContent + userNum;
    }
  } else if (calcTracker === 0) {
    displayBox.textContent = displayBox.textContent + userNum;
  }
  calcTracker = 0;
}

function handleOperationClick(e) {
  dotButton.classList.remove("disableButton");
  let operation = e.target.textContent;

  if (
    displayBox.textContent.length >= 1 &&
    (displayBox.textContent.indexOf("×") > -1 ||
      displayBox.textContent.indexOf("+") > -1 ||
      displayBox.textContent.indexOf("−") > -1 ||
      displayBox.textContent.indexOf("÷") > -1)
  ) {
    let charOp = "";
    // look for the current text and look for the operator char and store in charOp
    for (char of displayBox.textContent) {
      if (!!(char * 1) === false && char !== 0) {
        charOp = charOp + char;
      }
    }
    // take away surrounding whiteSpace
    charOp = charOp.trim();
    // replace the current char op with the new one the use clicked on
    displayBox.textContent = displayBox.textContent.replace(charOp, operation);
  } else if (displayBox.textContent.length >= 1) {
    // set an operator in the text
    // follow up call of the function will go into the first if statement
    displayBox.textContent = displayBox.textContent + " " + operation + " ";
  }
  negTracker = 0;
}
function handleCalc() {
  if (displayBox.textContent === "") {
    return null;
  }
  calcTracker = 1;
  negTracker = 0;
  dotButton.classList.remove("disableButton");

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
  // 0 evaulates to false and wouldn't execute the if statement check for 0
  if ((arr.length === 3 && num1 && num2) || num1 == 0 || num2 == 0) {
    displayBox.textContent = solution;
  } else {
    null;
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
document.querySelector("#resetButton").addEventListener("click", clear);
document.querySelector("#calcButton").addEventListener("click", handleCalc);
document.querySelector("#dotButton").addEventListener("click", handleDotClick);
document.querySelector("#toggleNeg").addEventListener("click", toggleNeg);

let numbers = document.querySelectorAll(".number");
for (number of numbers) {
  number.addEventListener("click", handleNumClick);
}

let operations = document.querySelectorAll(".operation");
for (operation of operations) {
  operation.addEventListener("click", handleOperationClick);
}
