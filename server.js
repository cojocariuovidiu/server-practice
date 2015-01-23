// NODE SERVER VIA PURE NODE
var http = require('http'),
    fs = require('fs');

    http.createServer(function(req, res){
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      });

      var readStream = fs.createReadStream(__dirname + '/index.html');

      readStream.pipe(res);
    }).listen(3000);

    console.log('Visit me at http://localhost:3000');

// NODE SERVER VIA EXPRESS