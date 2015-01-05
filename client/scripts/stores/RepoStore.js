
'use strict';

var AppDispatcher   = require('../dispatcher/AppDispatcher'),
    EventEmitter    = require('events').EventEmitter,
    AppConstants    = require('../constants/AppConstants'),
    assign          = require('object-assign'),
    githubService   = require('../services/githubService'),
    CHANGE_EVENT    = 'change',
    OWNER           = {},
    RepoStore,
    LAST_RESULT,
    SEARCHING_FOR_REPO = false,
    VISIBLE_REPO,
    //  helpers
    searchForRepo,
    setVisibleRepo,
    searchForIssues;

LAST_RESULT = {};

searchForIssues = function(ownerName, repoName){

  return githubService
  .getIssues(ownerName, repoName)
  .then(function(issues){
    OWNER[ownerName].repos[repoName].issues = issues;
    RepoStore.emitChange();
  });
};


searchForRepo = function(ownerName, repoName){

  SEARCHING_FOR_REPO = true;
  LAST_RESULT = {};
  RepoStore.emitChange();

  return githubService
  .getRepos(ownerName)
  .then(function(repoObj){

    if(OWNER[ownerName] === undefined){
      OWNER[ownerName] = {
        repos: {}
      };
    }

    searchForIssues(ownerName, repoName);

    repoObj
    .forEach(function(repoObj){
      OWNER[ownerName].repos[repoObj.name] = repoObj;
    });

    //  store the last search effort result
    LAST_RESULT = {
      ownerName: ownerName,
      repoName: repoName,
      found: OWNER[ownerName].repos[repoName] !== undefined
    };
  })
  .catch(function(err){
    throw err;
  })
  .finally(function(){
    SEARCHING_FOR_REPO = false;
    RepoStore.emitChange();
  });
};


setVisibleRepo = function(ownerName, repoName){

  VISIBLE_REPO = {
    ownerName: ownerName,
    repoName: repoName
  };
};


//  ===================================================== RepoStore
RepoStore = assign({}, EventEmitter.prototype, {

  getRepo: function(ownerName, repoName){

    if(OWNER[ownerName] === undefined){
      return undefined;
    } else {
      return OWNER[ownerName].repos[repoName];
    }
  },

  getIssues: function(ownerName, repoName){

    if(OWNER[ownerName] === undefined || OWNER[ownerName].repos[repoName] === undefined){
      return undefined;
    } else {
      return OWNER[ownerName].repos[repoName].issues;
    }
  },

  getVisibleRepo: function(){

    if(
      VISIBLE_REPO === undefined ||
      OWNER[VISIBLE_REPO.ownerName] === undefined ||
      OWNER[VISIBLE_REPO.ownerName].repos[VISIBLE_REPO.repoName] === undefined
    ){
      return undefined;
    }

    return OWNER[VISIBLE_REPO.ownerName].repos[VISIBLE_REPO.repoName];
  },

  getLastSearchResult: function(){
    return LAST_RESULT;
  },

  isSearchingForRepo: function(){
    return SEARCHING_FOR_REPO;
  },

  /**
  * Emit a 'change' event to all the listeners
  */
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
  * @param {function} callback
  */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
  * @param {function} callback
  */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


// Register to handle all updates
AppDispatcher.register(function(payload) {

  var action = payload.action,
  //  flag to let us know if there is a change in this store
  seenChange = true;

  switch(action.actionType) {

    case AppConstants.SEARCH_FOR_REPO:

      if(
        OWNER[action.ownerName] === undefined ||
        OWNER[action.ownerName].repos[action.repoName] === undefined
      ){
        searchForRepo(action.ownerName, action.repoName);
      }
      break;

    case AppConstants.SET_VISIBLE_REPO:
      if(
        OWNER[action.ownerName] === undefined ||
        OWNER[action.ownerName].repos[action.repoName] === undefined
      ){
        setVisibleRepo(action.ownerName, action.repoName);
      }
      break;

    default:
      seenChange = false;
      return true;
  }


  //  update the listeners
  seenChange && RepoStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = RepoStore;
