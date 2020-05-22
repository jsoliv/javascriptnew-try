let express =  require('express') // step 1 - create a variable to use Express
let app = express() // step 2 calling Express
let mongodb = require('mongodb') //step 10: requiring mongodb, so our code can work with it 
let db // step 9: creating a variable that represents the mongodb connection
app.use(express.static('public')) // step 12: making the contect of folder public available

let connectionString = 'mongodb+srv://todoAppUser:tarsila@cluster0-bcdnw.mongodb.net/TodoApp?retryWrites=true' // this line could be inside mongodeb.connect, but we decided to keep it separete so our code gets easier to read
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    db = client.db()
    app.listen(3000) // step 4 telling what port the localhost, or the host, must be listening to, that means http://localhost:3000/em
}) // connecting with mongodb 

app.use(express.json()) // telling Express to add froms from assincrynous request
app.use(express.urlencoded({extended: false})) // telling Express to add all form values to the body value, and add that body object to the request object


app.get('/', function(req, res){ // step 3 telling our APP what it should do when if it recives an incoming request to the the home pace url
    db.collection('items').find().toArray(function(err, items) {  // finding a document in mongodb and moving it to a Javascript arrray
   
// bellow, sending the http temple as response:
res.send(`
    
<!DOCTYPE html>
<html>
<hea>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple To-Do App</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
</head>
<body>
  <div class="container">
    <h1 class="display-4 text-center py-1">To-Do App</h1>
    
    <div class="jumbotron p-3 shadow-sm">
      <form action="/create-item" method="POST"> <!-- step 6 defining which url will be send to the method in app.post (step 5) -->
        <div class="d-flex align-items-center">
          <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">  <!-- step 7 naming the input field-->
          <button class="btn btn-primary">Add New Item</button>
        </div>
      </form>
    </div>
    
    <ul class="list-group pb-5">
      ${items.map(function(item){ // calling each item in the array
 
          return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
          <span class="item-text">${item.text} </span> <! item.text represents the current item in the array, text is its property !>
          <div>
            <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
            <button class="delete-me btn btn-danger btn-sm">Delete</button>
          </div>
        </li>`
          

      }).join('')} <! join is used to removing space beteween the parements returned !:>

    </ul>
    
  </div>
<-- below, we added the axios library, so we can leverage its features to create our code so we can send http request to our Javascript. More details at https://www.youtube.com/watch?v=qM4G1Ai2ZpE and 

  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 <!-- <script src="/axios/dist/axios.min.js"></script> --!>


<!-- step 11 -  to make this code more orginized we are using another file to handle the broser portion bellow, also we need to create a public folder --!> 
  <script src="/browser.js"></script>
  
</body>
</html>`)


    })

    
})


app.post("/create-item", function(req, res){        // step 5 this a method to submit the form "Add New Item    "
      db.collection('items').insertOne({text: req.body.item}, function() { // step 8: creating a new document in the mongodb
        res.redirect('/') // as a response, we will redirect to the main page
       
      })
    
}) 


app.post('/update-item', function (req, res) { //define portion to be received from the site, accoring to the code in brower.js
  console.log(req.body.text) // 

  res.send("Sucess")

})



