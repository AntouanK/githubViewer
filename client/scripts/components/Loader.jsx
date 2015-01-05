
/** @jsx React.DOM */
var React     = require('react'),
    Loader;


Loader = React.createClass({

  getInitialState: function(){
    return {
      loaderHtml: '<div class="text text-center">Searching for issues...</div>'+
      '<svg width="60" height="15" viewBox="0 0 120 30" fill="#777"><circle cx="15" cy="15" r="14.993">   <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/>   <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/>          </circle>          <circle cx="60" cy="15" r="9.00698" fill-opacity="0.3">              <animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite"/>              <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite"/>          </circle>          <circle cx="105" cy="15" r="14.993">              <animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite"/>              <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite"/></circle></svg>'
    };
  },

  render: function() {
    return (
      <div className="loader-container" dangerouslySetInnerHTML={{__html: this.state.loaderHtml}}>
      </div>
    );
  }

});

module.exports = Loader;
