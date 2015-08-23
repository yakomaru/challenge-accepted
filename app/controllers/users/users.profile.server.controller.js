'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

exports.search = function(req, res){
	var searchedUser = req.userName;
  if(req.user){
    return User.find({username: req.body.userName}, function(err, user){
    	console.log(req.body.userName);
    	console.log(user);
    	res.send(user);
    });
  } else {

    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

exports.add = function(req, res){
	var addedUser = req.userName;
	if(req.user){
    return User.find({_id: req.user._id}, function(err, user){
    	user[0].friendsList.push(req.body.userName);
    	console.log(user[0].friendsList);
    	console.log(user[0]);
    	User.update({_id: req.user._id}, {friendsList: user[0].friendsList}, {upsert: true}, function(err, item) {
        res.send();
      });
    });
  } else {

    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

exports.retrieveFriends = function(req, res){
	var addedUser = req.userName;
	if(req.user){
    return User.find({_id: req.user._id}, function(err, user){
    	console.log('user: '+ user[0]);
    	console.log('loading friends list for user: '+ user[0].friendsList);
        res.send(user[0].friendsList);
      });
  } else {

    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

/**
 * Send User
 */
exports.me = function(req, res) {
	res.json(req.user || null);
};