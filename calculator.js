let calcTracker = 0;
let negTracker = 0;

// refactor code
// can still add number after = button

// when calc has been pressed
// calcTracker --> 1
// 0 has not clicked calculate
// 1 has clicked calculate
let displayBox = document.querySelector("#displayBox");
let dotButton = document.querySelector("#dotButton");
let negButton = document.querySelector("#toggleNeg");

// have a container for num1
// have a container for num2

function clear() {
  dotButton.classList.remove("disableButton");
  displayBox.textContent = "";
  calcTracker = 0;
  negTracker = 0;
}
function handleDotClick(e) {
  let dot = ".";
  let lastInput = displayBox.textContent[displayBox.textContent.length - 1];

  if (lastInput === "." && calcTracker === 1) {
    null;
  } else if (calcTracker === 1 && lastInput.length >= 1) {
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
  let userInput = displayBox.textContent;

  if (userInput === "") {
    displayBox.textContent = displayBox.textContent + userNum;
  } else if (calcTracker === 1) {
    if (displayBox.textContent === "0" || userInput.length == 1 || lastChar) {
      displayBox.textContent = userNum;
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

  calcTracker++;
  negTracker = 0;

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
  // 0 evaulates to false and wouldn't execute the if statement check for 0
  if ((arr.length === 3 && num1 && num2) || num1 == 0 || num2 == 0) {
    displayBox.textContent = solution;
  } else {
    null;
  }
}
function toggleNeg() {
  // should place a minus at the beginng on first click
  //  should remove the minus at the beginning on second click
  // should disable after pressing the operator -- on hold
  // 2 substrings after operator click
  // or check if string contains an operator, if so do substrings
  // after substring move on to next string
  // if(substring1 exists then ignore substr1 and focus on substring2)

  let arr = displayBox.textContent.split("");
  let operator = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "×") {
      operator = operator + arr[i];
    } else if (arr[i] === "+") {
      operator = operator + arr[i];
    } else if (arr[i] === "−") {
      operator = operator + arr[i];
    } else if (arr[i] === "÷") {
      operator = operator + arr[i];
    }
  }

  operator = operator.trim();

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
