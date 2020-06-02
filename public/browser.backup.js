document.addEventListener("click", function(e) {
if (e.target.classList.contains("edit-me")) { // if an element contains a class of "edit-me" (that class is in the HTML portion)  do...

     let userimput =  prompt("enter you desired new test!") // a prompt will pop up when we click edit, the content will be added to the variable userimput

     axios.post('/update-item',{text: userInput, id: e.target.getAttribute("data-id")}).then(function() { // using axios is going to return a promisse, on the action is complete with; data-id is the attribute linkend to each mongodb items ID



     }).catch(function() {

     // console
     console.log("Please try again")

    })
}
})