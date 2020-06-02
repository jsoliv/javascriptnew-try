document.addEventListener("click", function(e) {
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
    if (userInput) { // this if statement is here to deal with the cancel botton
      axios.post('/update-item', {text: userInput, id: e.target.getAttribute("data-id")}).then(function () {
        e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
      }).catch(function() {
        console.log("Please try again later.")
      })
    }
  }
})