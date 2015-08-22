'use strict';

var _ = require('lodash'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Challenge = mongoose.model('Challenge');


// get all challenges from user -get
exports.getAllUserChallenges = function(req, res){
  if(req.user){
    return User.find({_id: req.user._id}, function(err, item){
      res.send(item[0].challenges);
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

// add challenge to user challenges array -subscribe
exports.addChallenges = function(req, res){
  if(req.user){
    return User.find({_id: req.user._id}, function(err, user){
      Challenge.find({_id: req.body._id}, function(err,item){
        var today = Date.now();
        item[0].tasks.forEach(function(task, i){
          item[0].tasks[i].taskSchedule = new Date(today + (86400000 * task.relativeDate));
        });
        user[0].challenges.push(item[0]); //referenced copy? or is db immune?
        User.update({_id: req.user._id}, {challenges: user[0].challenges}, {upsert: true}, function(err, item) {
          res.send();
        });
      });
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

// remove challenge from user challenges array -unsubscribe
exports.removeUserChallenges = function(req, res){
  if(req.user){
    return User.find({_id: req.user._id}, function(err, user){
      user[0].challenges = user[0].challenges.filter(function(challenge){
        if(challenge){
          return challenge._id.toString() !== req.body._id;
        } else {
          return false;
        }
      });
      User.update({_id: req.user._id}, {challenges: user[0].challenges}, {upsert: true}, function(err, item) {
        res.send();
      });
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

//remove challenge task
exports.removeChallengeTask = function(req, res){
  if(req.user){
    console.log('removing challenge task');
    return User.find({_id: req.user._id}, function(err, user){
      var newArray = [];
      var newChallenges = [];
      console.log('challenges: ' + user[0].challenges);
      console.log('challenge index: ' + req.body.challengeIndex);
      console.log('task index: ' + req.body.index);
      console.log('req body: ' + req.body);
      delete user[0].challenges[req.body.challengeIndex].tasks[req.body.index];
      for(var i = 0; i < user[0].challenges[req.body.challengeIndex].tasks.length; i++){
        if(user[0].challenges[req.body.challengeIndex].tasks[i] !== null){
          newArray.push(user[0].challenges[req.body.challengeIndex].tasks[i]);
        }
      }
      user[0].challenges[req.body.challengeIndex].tasks = newArray;
      console.log(user[0].challenges[req.body.challengeIndex]);
      console.log(user[0].challenges[req.body.challengeIndex].tasks);
      User.update({_id: req.user._id}, {challenges: user[0].challenges}, {upsert: true}, function(err, item) {
        res.send();
    });
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};
