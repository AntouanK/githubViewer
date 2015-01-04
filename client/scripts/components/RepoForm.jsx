
/** @jsx React.DOM */
var React         = require('react'),
    githubService = require('../services/githubService'),
    RepoForm,
    getRepoFormState;


RepoForm = React.createClass({

  getInitialState: function() {
    return {
      formDisabled: true,
      possibleRepoNames: this.props.possibleRepoNames
    };
  },

  componentDidMount: function () {
    
    var self = this,
        ownerInput;

    ownerInput = self.getDOMNode().querySelector('[role="owner-name"');

    ownerInput
    .onblur = function(){
    
      var ownerName = ownerInput.value;

      if(ownerName !== ''){
        self.findRepoSuggestions(ownerName);
      }
    };
  },

  findRepoSuggestions: function(ownerName){

    githubService
    .getOwner(ownerName)
    .then(function(ownerObj){
      console.log('ownerObj', ownerObj);
    });
  },

  handleOwnerChange: function(ev){

    var owner = ev.target.value;

    //  if there's no owner name set, disable the "search" form
    if(owner === ''){
      this.setState({
        formDisabled: true,
        possibleRepoNames: this.state.possibleRepoNames
      });
      return true;
    }

    console.log(owner);
  },

  handleRepoChange: function(ev){

    var repo = ev.target.value;

    //  if there's no repo name set, disable the "search" form
    if(repo === ''){
      this.setState({
        formDisabled: true,
        possibleRepoNames: this.state.possibleRepoNames
      });
      return true;
    }
    //  else
    this.setState({
      formDisabled: false,
      possibleRepoNames: this.state.possibleRepoNames
    });

  },

  submitForm: function(){
    console.log('submit');
  },

  render: function() {

    var self = this,
        repoAutocomplete;

    if(this.state.possibleRepoNames === undefined){
      repoAutocomplete = '';
    } else {
      repoAutocomplete = (
        <datalist id="browsers">
          <option value="Chrome" />
          <option value="Firefox" />
          <option value="Internet Explorer" />
          <option value="Opera" />
          <option value="Safari" />
        </datalist>
      );
    }


    return (
      <div className="cmp-repo-form">
        <div className="row">
          <div className="small-12 medium-5 columns">
            <span>Owner </span>
            <input
              role="owner-name"
              type="text"
              onChange={this.handleOwnerChange} />
          </div>
          <div className="small-12 medium-5 columns">
            <span>Repo </span>
            <input
              role="repo-name"
              type="text"
              onChange={this.handleRepoChange} />
              {repoAutocomplete}
          </div>
          <div className="small-12 medium-2 columns">
            <button
              type="button"
              disabled={this.state.formDisabled}
              onClick={this.submitForm}>
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = RepoForm;
