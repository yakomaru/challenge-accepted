'use strict';

var mongoose = require('mongoose'),
  passport = require('passport'),
  Challenges = mongoose.model('Challenge'),
  Task = mongoose.model('Task'),
  Org = mongoose.model('Org');

// this functions returns all documents in challenges table
exports.getChallenges = function(req,res){
  if(req.user || req.org){
    return Challenges.find({}, function(err, array) {
      res.send(array);
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

// this function adds a single challenge document in challenges table
exports.addChallenges = function(req,res){
  // if(req.user){
    var challenge = req.body;

    // replaces each task in challenge into a proper Task
    challenge.tasks.forEach(function(task, i){
      var newTask = new Task(task);
      newTask.save();
      challenge.tasks[i] = newTask;
    });

    // create new challenge 
    var newChallenge = new Challenges(challenge);
    newChallenge.save();
    return res.send();
};

// this function returns an array of challenges from challenges table
// request body should have at least one paramater that can match a challenge
exports.findChallenges = function(req,res){
  if(req.user || req.org){
    return Challenges.find(req.body, function(err, challenges) {
      res.send(challenges);
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};