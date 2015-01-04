
'use strict';

var githubService   = {},
    https           = require('https-browserify'),
    Q               = require('q');


githubService
.getOwner = function(ownerName){

  var deferred = Q.defer(),
      options;

  if(typeof ownerName !== 'string' || ownerName === ''){
    deferred.reject(new Error('getOwner needs a string as an argument'));
    return deferred.promise;
  }

  options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/users/' + ownerName,
    method: 'GET'
  };

  https
  .request(options, function (res) {

    var body = '';

    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){

      var jsonBody;

      try {
        jsonBody = JSON.parse(body);
      } catch(e){
        deferred.reject(e);
        return true;
      }

      deferred.resolve(jsonBody);
    });

  })
  .end();

  return deferred.promise;
};


module.exports = githubService;
