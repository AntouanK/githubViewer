
'use strict';

var express       = require('express'),
    compression   = require('compression'),
    path          = require('path'),
    https         = require('https'),
    app           = express(),
    cwd,
    deployPath,
    options;

cwd = process.cwd();
deployPath = path.join(cwd, 'client', 'deploy');

app.use(compression());

app.get('/API/getUser', function(req, res, next){

  var userName = req.query.name,
      options;

  if(userName !== undefined && userName !== ''){

    options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/users/' + userName,
      method: 'GET',
      headers: {
        'User-Agent': 'antouank'
      },
      agent: false
    };

    https
    .request(options, function(githubRes) {

      var body = '';

      githubRes
      .on('data', function(chunk){
        body += chunk;
      });

      githubRes
      .on('end', function(){

        var jsonBody;

        try {
          jsonBody = JSON.parse(body);
        } catch(e){
          throw e;
        }

        res.json(jsonBody);
      });

    })
    .end();
  } else {
    res.json({
      error: 'not valid argument'
    });
  }

});

//  static server
options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['html', 'js', 'css'],
  index: false,
  maxAge: 0,
  redirect: false
};

app.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});
app.use(express.static(deployPath, options));

app.listen(4000);
