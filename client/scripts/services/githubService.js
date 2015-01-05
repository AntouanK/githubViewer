
'use strict';

var githubService   = {},
    http            = require('http'),
    Q               = require('q');


githubService
.getOwner = function(ownerName){

  var deferred = Q.defer();

  if(typeof ownerName !== 'string' || ownerName === ''){
    deferred.reject(new Error('getOwner needs a string as an argument'));
    return deferred.promise;
  }

  http
  .get('/API/getUser?name=' + ownerName, function(res){

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
});

  return deferred.promise;
};



githubService
.getRepos = function(ownerName){

  var deferred = Q.defer();

  if(typeof ownerName !== 'string' || ownerName === ''){
    deferred.reject(new Error('getOwner needs a string as an argument'));
    return deferred.promise;
  }

  http
  .get('/API/getRepos?name=' + ownerName, function(res){

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
});

  return deferred.promise;
};



githubService
.getIssues = function(ownerName, repoName){

  var deferred = Q.defer();

  if(
    typeof ownerName !== 'string' || ownerName === '' ||
    typeof repoName !== 'string' || repoName === ''
  ){
    deferred.reject(new Error('getIssues needs strings as arguments'));
    return deferred.promise;
  }

  http
  .get('/API/getIssues?userName=' + ownerName + '&repoName=' + repoName,
  function(res){

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
});

  return deferred.promise;
};


module.exports = githubService;
