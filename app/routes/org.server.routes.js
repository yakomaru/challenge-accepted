'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// Org Routes
	var org = require('../../app/controllers/org.server.controller');

	// Setting up the org tasks routes
	app.route('/org/tasks').get(org.getOrgTasks); // get all tasks from org
	app.route('/org/tasks').put(org.putOrgTasks); // add single task to org tasks array
	app.route('/org/tasks').post(org.removeTask);
	app.route('/org/tasks/remove').put(org.removeOrgTasks); //delete a task from org tasks array
	app.route('/org/tasks/update').put(org.toggleOrgTask); // toggle completion of task

	// Setting up the org challenges routes
	app.route('/org/challenges').get(org.getAllOrgChallenges); // get all challenges from org
	app.route('/org/challenges').put(org.addChallenges); // add challenge to org challenges array
	app.route('/org/challenges/remove').put(org.removeOrgChallenges); // remove challenge from org challenges array
	app.route('/org/challenges/tasks/remove').post(org.removeChallengeTask);
	app.route('/org/challenges/check').post(org.checkChallengeComplete);
<<<<<<< HEAD
=======

	// Finish by binding the org middleware
	app.param('orgId', org.orgByID);
>>>>>>> eaaef395597590ec4bbe351975b37e172e0b9f69
};