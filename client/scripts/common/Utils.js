
'use strict';

var Utils = {},
    pretty = require('pretty-ms');


Utils.longAgo = function(timestamp){

  var now = Date.now(),
      diff = now - timestamp;

  return pretty(diff);
};

module.exports = Utils;
