'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users.server.controller');

	// Setting up the users tasks routes
	app.route('/users/tasks').get(users.getUserTasks); // get all tasks from user
	app.route('/users/tasks').put(users.putUserTasks); // add single task to user tasks array
	app.route('/users/tasks').post(users.removeTask);
	app.route('/users/tasks/remove').put(users.removeUserTasks); //delete a task from user tasks array
	app.route('/users/tasks/update').put(users.toggleUserTask); // toggle completion of task

	// Setting up the users challenges routes
	app.route('/users/challenges').get(users.getAllUserChallenges); // get all challenges from user
	app.route('/users/challenges').put(users.addChallenges); // add challenge to user challenges array
	app.route('/users/challenges/remove').put(users.removeUserChallenges); // remove challenge from user challenges array
	app.route('/users/challenges/tasks/remove').post(users.removeChallengeTask);
	app.route('/users/challenges/check').post(users.checkChallengeComplete);

	//Settubg up user org routes
	app.route('/users/myorg').post(users.getAllUserOrg);
	app.route('/users/myorg/create').post(users.createOrg);

	//Setting up friendsList routes
	app.route('/users/friends/search').post(users.search);
	app.route('/users/friends/add').post(users.add);
	app.route('/users/friends/').get(users.retrieveFriends);


	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);
	app.route('/users/accounts').delete(users.removeOAuthProvider);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	// Setting the facebook oauth routes
	app.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	app.route('/auth/facebook/callback').get(users.oauthCallback('facebook'));

	// Setting the twitter oauth routes
	app.route('/auth/twitter').get(passport.authenticate('twitter'));
	app.route('/auth/twitter/callback').get(users.oauthCallback('twitter'));

	// Setting the google oauth routes
	app.route('/auth/google').get(passport.authenticate('google', {
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}));
	app.route('/auth/google/callback').get(users.oauthCallback('google'));

	// Setting the linkedin oauth routes
	app.route('/auth/linkedin').get(passport.authenticate('linkedin'));
	app.route('/auth/linkedin/callback').get(users.oauthCallback('linkedin'));

	// Setting the github oauth routes
	app.route('/auth/github').get(passport.authenticate('github'));
	app.route('/auth/github/callback').get(users.oauthCallback('github'));

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};