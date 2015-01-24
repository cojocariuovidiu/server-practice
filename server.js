// NODE SERVER VIA PURE NODE
// var http = require('http'),
//     fs = require('fs');

//     http.createServer(function(req, res){
//       res.writeHead(200, {
//         'Content-Type': 'text/html',
//         'Access-Control-Allow-Origin': '*'
//       });

//       var readStream = fs.createReadStream(__dirname + '/index.html');

//       readStream.pipe(res);
//     }).listen(3000);

//     console.log('Visit me at http://localhost:3000');

////////// NODE SERVER VIA EXPRESS //////////
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    apiRouter = express.Router(),
    User = require('./models/user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/server-practice');

app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \ Authorization');
  next();
});

app.use(morgan('dev'));



app.get('/', function(req,res){
  res.send('Welcome to the homepage');
});



apiRouter.get('/', function(req,res){
  res.json({message: 'hooray welcome to our api'});
});

app.use('/api', apiRouter);




app.listen(port);
console.log('server is running on port ' + port);