var express = require('express'); //require the express library
var bodyParser = require('body-parser'); //require the body parser module
var path = require('path');
var songRouter = require('./routes/songs');

var app = express(); //create a new application

app.use(bodyParser.urlencoded({ extended: true })); // returns a function that knows how to take a request, find any url body params & turn it into a js object
//need to use extended mode; have to use bodyParser first

app.use('/songs', songRouter);

app.use(function (req, res, next) { // used to explain the bodyParser section
  console.log('Got a request!');
  next();
});



app.post('/', function (req, res) {//HAS to come after bodyParser
  console.log('req.body=', req.body);
  res.sendStatus(200);
});

app.get('/', function(req, res) { //should be listening specifically to get requests; to which route &
  console.log('Received a request at', new Date());                //what am I supposed to do with this info?
  //_dirname is the folder this file lives in
  var filename = path.join(__dirname, 'public/views/index.html'); //dirname needs TWO underscores
  console.log('filename:', filename);
  res.sendFile(filename);
});

app.get('/kittens', function(req, res) {
  console.log('Query params:', req.query);
  if (req.query.age > 2) {
    res.send('MEOW!'); //can only send one response, but need to send some kind of response inside of handling function for a given request
  } else {
    res.send('meow');
  }
});


// declare outside the handler function; want to use the same
//array every time (that's why it's outside function)


//middleware for serving static files (which are any files that don't change while the server is running)
app.use(express.static('public')); //whatever directory you run node in, this path needs to be relevant to that

app.listen(3000); // create a server; doesn't know how to handle any type of request, tho
// is only listening at this point; get & listen put together: localhost:3000/
// handler/middleware = function (req, res, next)
// route = method type (GET, POST, etc.) + path ('/', or '/kittens', etc.) + handler ^^(right above)
