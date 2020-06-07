function handleToggle() {
  let toggle = document.querySelector("#displayNumber").textContent;
  //   if turned On and has content then turn off
  if (toggle.length > 0) {
    document.querySelector("#displayNumber").textContent = "";
    // if turned off and no content then turn on with "0"
  } else if (toggle.length === 0) {
    document.querySelector("#displayNumber").textContent = "0";
  }
}
function handleNumClick(e) {
  let number = e.target.textContent;
  document.querySelector("#displayNumber").textContent = number;
}
document.querySelector("#onButton").addEventListener("click", handleToggle);

let buttons = document.querySelectorAll("button");
for (button of buttons) {
  button.addEventListener("click", handleNumClick);
}

// the + will be the break between num1 and num2
