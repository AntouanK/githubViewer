
/** @jsx React.DOM */
var React       = require('react'),
    MainApp     = require('./components/MainApp.jsx'),
    app;


app = (function() {

  return React
  .render(
    <MainApp />,
    document.querySelector('#main-app')
  );

})();
