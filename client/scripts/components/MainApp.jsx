
/** @jsx React.DOM */
var React         = require('react'),
    RepoForm      = require('./RepoForm.jsx'),
    Loader        = require('./Loader.jsx'),
    Issue         = require('./Issue.jsx'),
    RepoStore     = require('../stores/RepoStore'),
    MainApp,
    getMainAppState;

/**
* Return a state for the Main App component
*
* @return {object} the state of this component
*/
getMainAppState = function(){

  var lastSearchResult = RepoStore.getLastSearchResult(),
      issues;

  if(lastSearchResult && lastSearchResult.found){
    issues =
    RepoStore.getIssues(lastSearchResult.ownerName, lastSearchResult.repoName);
  }

  return {
    searchResult: lastSearchResult,
    searchingForRepo: RepoStore.isSearchingForRepo(),
    issues: issues
  };
};

MainApp = React.createClass({

  getInitialState: function() {
    return getMainAppState();
  },

  //  when the component is mounted
  componentDidMount: function() {

    //  register to listen for changes
    //  from the news store
    RepoStore.addChangeListener(this._onChange);
  },


  getLoaderSection: function(){

    var self = this,
        loaderSection;

    if(self.state.searchingForRepo){
      loaderSection = (
        <Loader />
      );
    } else {
      loaderSection = '';
    }

    return loaderSection;
  },

  getIssuesSection: function(){

    var self = this,
        issuesSection;

    if(
      self.state.searchingForRepo ||      //  it's busy
      !self.state.searchResult.found ||   //  last search was failed
      !self.state.issues                  //  there are no issues to show
    ){
      issuesSection = '';
    } else {
      issuesSection = 
      self.state.issues
      .map(function(issue){
        return (
          <Issue data={issue} key={issue.id} />
        );
      });
    }

    return issuesSection;
  },

  render: function() {

    var self = this,
        loaderSection,
        issuesSection;

    loaderSection = self.getLoaderSection();
    issuesSection = self.getIssuesSection();

    return (
      <div className="main-app">
        <div id="main-form-section" className="row">
          <div className="small-12">
            <RepoForm />
          </div>
        </div>
        <div className="row">
          {loaderSection}
        </div>
        <div className="row main-issues-section">
          <div className="small-12">
            {issuesSection}
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState( getMainAppState() );
  }

});

module.exports = MainApp;
