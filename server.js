var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

// Create instance of express app
var app = express()

// We want to serve js and html in ejs
// ejs stands for embedded javascript
app.set('view engine', 'ejs')

// We also want to send css, images, and other static files
app.use(express.static('views'))
app.set('views', __dirname + '/views')

// Give the server access to the user input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'))

app.get('/', function(request, response){
    response.render('index.html')
})

app.post('/', function(request, response){

})

var port = process.env.PORT || 8080

app.listen(port, function(){
    console.log('App running on port ' + port)
})
