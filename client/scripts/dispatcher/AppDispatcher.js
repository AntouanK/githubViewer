
'use strict';

var Dispatcher = require('flux').Dispatcher,
    assign = require('object-assign'),
    AppDispatcher;

AppDispatcher = assign(new Dispatcher(), {

  /**
  * A bridge function between the views and the dispatcher, marking the action
  * as a view action.
  * @param  {object} action The data coming from the view.
  */
  handleViewAction: function(action) {

    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  },

  /**
  * A bridge function between the server and the dispatcher, marking the action
  * as a server action.
  * @param  {object} action The data coming from the server.
  */
  handleServerAction: function(action) {

    this.dispatch({
      source: 'SERVER_ACTION',
      action: action
    });
  }

});

module.exports = AppDispatcher;
