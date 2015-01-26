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
    config = require('./config'),
    path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function(req,res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

app.use(morgan('dev'));

mongoose.connect(config.database);

app.use(express.static(__dirname + '/public'));

var apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes); 

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


app.listen(config.port);
console.log('server is running on port ' + config.port);