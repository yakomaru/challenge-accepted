'use strict';

var passport = require('passport');

module.exports = function(app) {

  var challenges = require('../../app/controllers/challenges.server.controller');

  //gets all challenges from db
  app.route('/challenges').get(challenges.getChallenges);

  //adds a single challenge to db
  app.route('/challenges').put(challenges.addChallenges);

  //retrieves a single challenge by name from db
  app.route('/challenges/search').put(challenges.findChallenges);



};
