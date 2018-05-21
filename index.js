var express = require('express'); //import the express module
var app = express(); //init express
var server =  require('http').createServer(app); //create server
var path = require('path'); //init the path module
var port = process.env.PORT || 5000; //init the port number

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use static files
app.use(express.static(path.join(__dirname, 'public')));

//listen on server
server.listen(port);

//initializing session variable
var appSession;

//when the index page is requested
app.get('/', (req,res) => {
	res.render('index.ejs',{title:'E-report'});
});