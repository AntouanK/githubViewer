
/** @jsx React.DOM */
var React         = require('react'),
    AppActions    = require('../actions/AppActions'),
    githubService = require('../services/githubService'),
    RepoForm,
    getRepoFormState;


RepoForm = React.createClass({

  getInitialState: function() {
    return {
      formDisabled: true,
      possibleRepoNames: this.props.possibleRepoNames,
      ownerName: '',
      repoName: ''
    };
  },

  componentDidMount: function () {
    
    var self = this,
        ownerInput;

    ownerInput = self.getDOMNode().querySelector('[role="owner-name"]');

    ownerInput
    .onblur = function(){
    
      var ownerName = ownerInput.value;

      if(ownerName !== ''){
        self.findRepoSuggestions(ownerName);
      }
    };
  },

  findRepoSuggestions: function(ownerName){

    var self = this;

    githubService
    .getRepos(ownerName)
    .then(function(repos){

      var names = 
      repos
      .map(function(repo){
        return repo.name;
      });

      self.setState({
        possibleRepoNames: names
      });
    });
  },

  handleOwnerChange: function(ev){

    var ownerName = ev.target.value;

    //  if there's no owner name set, disable the "search" form
    if(ownerName === ''){
      this.setState({
        formDisabled: true,
        ownerName: ownerName
      });
      return true;
    }

    this.setState({
      ownerName: ownerName
    });
  },

  handleRepoChange: function(ev){

    var repoName = ev.target.value;

    //  if there's no repo name set, disable the "search" form
    this.setState({
      formDisabled: repoName === '',
      repoName: repoName
    });
  },

  submitForm: function(){
    AppActions.searchForRepo(this.state.ownerName, this.state.repoName);
    AppActions.setVisibleRepo(this.state.ownerName, this.state.repoName);
  },

  render: function() {

    var self = this,
        repoAutocomplete,
        repoSuggestions,
        repoNameListId = 'repo-name-'+Date.now();

    if(self.state.possibleRepoNames === undefined){
      repoAutocomplete = '';
    } else {
      repoSuggestions = self.state.possibleRepoNames
      .map(function(repoName){
        return '<option value="'+repoName+'" />';
      })
      .join('');

      repoAutocomplete = (
        '<datalist id="'+repoNameListId+'">' + repoSuggestions +
        '</datalist>'
      );
    }


    return (
      <div className="cmp-repo-form row">
        <div className="small-12 medium-5 columns">
          <span>Owner </span>
          <input
            role="owner-name"
            type="text"
            onChange={self.handleOwnerChange} />
        </div>
        <div className="small-12 medium-5 columns">
          <span>Repo </span>
          <input
            role="repo-name"
            list={repoNameListId}
            type="text"
            onChange={self.handleRepoChange} />
          <span dangerouslySetInnerHTML={{ __html: repoAutocomplete }}></span>
        </div>
        <div className="small-12 medium-2 columns">
          <button
            type="button"
            disabled={self.state.formDisabled}
            onClick={self.submitForm}>
            Search
          </button>
        </div>
      </div>
    );
  }

});

module.exports = RepoForm;
