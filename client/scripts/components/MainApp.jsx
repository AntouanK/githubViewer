
/** @jsx React.DOM */
var React         = require('react'),
    RepoForm      = require('./RepoForm.jsx'),
    MainApp,
    getMainAppState;

/**
* Return a state for the Main App component
*
* @return {object} the state of this component
*/
getMainAppState = function(){

  return {
  };
};

MainApp = React.createClass({

  getInitialState: function() {
    return getMainAppState();
  },

  // //  when the component is mounted
  // componentDidMount: function() {

  //   //  register to listen for changes
  //   //  from the news store
  //   UsersStore.addChangeListener(this._onChange);
  //   StatsStore.addChangeListener(this._onChange);
  // },

  render: function() {

    var self = this;


    return (
      <div className="main-app">
        <RepoForm />
      </div>
    );
  },

  _onChange: function() {
    this.setState( getMainAppState() );
  }

});

module.exports = MainApp;
