var express = require("express")
var logger = require("morgan")
var bodyParser = require("body-parser")

// var admin = require("firebase-admin");

// var serviceAccount = require("trip-planner-eaabd-firebase-adminsdk-zad3w-26bee21145.json");


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://trip-planner-eaabd.firebaseio.com"
// });

// var database = firebaseAdmin.database()

var app = express()

app.set("view engine", "ejs")

app.use(express.static("views"))
app.set("views", __dirname + "/views")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(logger("dev"))

app.get("/", function(request,response){
    response.render("index.html")
})

app.post("/", function(request, response) {

})

var port = process.env.PORT || 8080

app.listen(port, function() {
        console.log("App running on port " + port)
    })