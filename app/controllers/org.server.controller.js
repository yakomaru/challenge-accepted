'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
  require('./org/org.challenges.server.controller'),
  require('./org/org.tasks.server.controller')
);
