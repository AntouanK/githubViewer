
/** @jsx React.DOM */
var React     = require('react'),
    Utils     = require('../common/Utils'),
    Issue;


Issue = React.createClass({

  render: function() {

    var issueData = this.props.data,
        longAgo;

    longAgo = Utils.longAgo((new Date(issueData.created_at)).getTime());
    //  replace the "seconds" part
    longAgo = longAgo.replace(/\s[\d\.]+s/i, '') + ' ago';

    if(issueData === undefined){
      throw new Error('<Issue /> needs data to be rendered');
    }

    return (
      <div className="row cmp-issue">
        <div className="small-2 columns">
          #{issueData.number}
        </div>
        <div className="small-7 columns">
          {issueData.title}
        </div>
        <div className="small-3 columns">
          {longAgo}
        </div>
      </div>
    );
  }

});

module.exports = Issue;
