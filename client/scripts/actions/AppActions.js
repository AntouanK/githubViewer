
'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    AppActions;

AppActions = {

  /**
  */
  searchForRepo: function(ownerName, repoName) {

    AppDispatcher
    .handleViewAction({
      actionType: AppConstants.SEARCH_FOR_REPO,
      ownerName: ownerName,
      repoName: repoName
    });
  },

  /**
  */
  setVisibleRepo: function(ownerName, repoName) {

    AppDispatcher
    .handleServerAction({
      actionType: AppConstants.SET_VISIBLE_REPO,
      ownerName: ownerName,
      repoName: repoName
    });
  }
};

module.exports = AppActions;
