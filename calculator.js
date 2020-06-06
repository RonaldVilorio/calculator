function toggleButton() {
  let toggle = document.querySelector("#displayNumber").textContent;
//   if turned On and has content then turn off
  if (toggle.length > 0) {
    document.querySelector("#displayNumber").textContent = "";
    // if turned off and no content then turn on with "0"
  } else if (toggle.length === 0) {
    document.querySelector("#displayNumber").textContent = "0";
  }
}
// function pressNum(){
//     document.querySelector()
//     document.querySelectorAll(".display").textContent =

// }
