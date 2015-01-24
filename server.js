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
    adminRouter = express.Router(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/server-practice');

// middleware - process req, validate parameters, etc
adminRouter.use(function(req,res,next){
  console.log(req.method, req.url);  
  next();
});

adminRouter.param('name', function(req,res,next,name){
  // add validation logic
  console.log('doing validations on ' + name);
  req.name = name;
  next();
});

app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html');
});


// admin routes organized under /admin
adminRouter.get('/', function(req,res){
  res.send('I am the dashboard!');
});

adminRouter.get('/users', function(req,res){
  res.send('I show all the users!');
});

// route with parameter
adminRouter.get('/users/:name', function(req,res){
  res.send('hello ' + req.params.name + '!');
});

adminRouter.get('/posts', function(req,res){
  res.send('I show all the posts!');
});

app.use('/admin', adminRouter);


// login routes using .route instead of express.Router
// cleaner way of writing out routes
app.route('/login')
  .get(function(req,res){
    res.send('this is the login form');
  })

  .post(function(req,res){
    console.log('processing');
    res.send('processing the login form!');
  });

// server/port
app.listen(3000);
console.log('server is running on 3000');