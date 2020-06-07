function handleToggle() {
  let displayText = document.querySelector("#displayText").textContent;
  //   if turned On and has content then turn off
  if (displayText.length > 0) {
    document.querySelector("#displayText").textContent = "";
    // if turned off and no content then turn on with "0"
  } else if (displayText.length === 0) {
    document.querySelector("#displayText").textContent = "0";
  }
}
function handleNumClick(e) {
  // check to see if display has numebrs already
  let userNum = e.target.textContent;
  let displayNumber = document.querySelector("#displayText");
  if (displayNumber.textContent === "0") {
    displayNumber.textContent = userNum;
  } else if (displayNumber.textContent.length >= 1) {
    displayNumber.textContent = displayNumber.textContent + userNum;
  } else {
    displayNumber.textContent = userNum;
  }
}
function handleOperationClick(e) {
  let operation = e.target.textContent;
  displayOperation = document.querySelector("#displayText");
  // ++ is a no, there has to be content first, no 2 ++ inside string
  if (displayOperation.textContent.length >= 1) {
    displayOperation.textContent = displayOperation.textContent + operation;
  } else {
    null;
  }
}
document.querySelector("#onButton").addEventListener("click", handleToggle);

let numbers = document.querySelectorAll(".number");
for (number of numbers) {
  number.addEventListener("click", handleNumClick);
}
// make sure to differinate the operations button to the number buttons by class
// the equal button will be special, give it an id
let operations = document.querySelectorAll(".operation");
for (operation of operations) {
  operation.addEventListener("click", handleOperationClick);
}

// the + will be the break between num1 and num2
// or capture the whole string and send it to function =
