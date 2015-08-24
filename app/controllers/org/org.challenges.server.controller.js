'use strict';

var _ = require('lodash'),
  mongoose = require('mongoose'),
  Org = mongoose.model('Org'),
  Challenge = mongoose.model('Challenge');


// get all challenges from org -get
exports.getAllOrgChallenges = function(req, res){
  if(req.org){
    return Org.find({_id: req.org._id}, function(err, item){
      res.send(item[0].challenges);
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

// add challenge to org challenges array -subscribe
exports.addChallenges = function(req, res){
  if(req.org){
    return Org.find({_id: req.org._id}, function(err, org){
      Challenge.find({_id: req.body._id}, function(err,item){
        var today = Date.now();
        item[0].tasks.forEach(function(task, i){
          item[0].tasks[i].taskSchedule = new Date(today + (86400000 * task.relativeDate));
        });
        org[0].challenges.push(item[0]); //referenced copy? or is db immune?
        Org.update({_id: req.org._id}, {challenges: org[0].challenges}, {upsert: true}, function(err, item) {
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

// remove challenge from org challenges array -unsubscribe
exports.removeOrgChallenges = function(req, res){
  if(req.org){
    return Org.find({_id: req.org._id}, function(err, org){
      console.log(org[0].challenges);
      org[0].challenges = org[0].challenges.filter(function(challenge, index){
        if(challenge){
          return index !== req.body.index;
        } else {
          return false;
        }
      });
      Org.update({_id: req.org._id}, {challenges: org[0].challenges}, {upsert: true}, function(err, item) {
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
  if(req.org){
    console.log('removing challenge task');
    return Org.find({_id: req.org._id}, function(err, org){
      var newArray = [];
      var newChallenges = [];
      delete org[0].challenges[req.body.challengeIndex].tasks[req.body.index];
      for(var i = 0; i < org[0].challenges[req.body.challengeIndex].tasks.length; i++){
        if(org[0].challenges[req.body.challengeIndex].tasks[i] !== null){
          newArray.push(org[0].challenges[req.body.challengeIndex].tasks[i]);
        }
      }
      org[0].challenges[req.body.challengeIndex].tasks = newArray;
      console.log(org[0].challenges[req.body.challengeIndex]);
      console.log(org[0].challenges[req.body.challengeIndex].tasks);
      Org.update({_id: req.org._id}, {challenges: org[0].challenges}, {upsert: true}, function(err, item) {
        res.send();
    });
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

//Check to see if challenge completed
exports.checkChallengeComplete = function(req, res){
  var completed = 0;
  if(req.org){
    console.log('Checking if challenge completed');
    return Org.find({_id: req.org._id}, function(err, org){
      console.log(org[0].challenges[req.body.index].tasks);
      for(var i = 0; i < org[0].challenges[req.body.index].tasks.length; i++){
        if(org[0].challenges[req.body.index].tasks[i].completed){
          completed++;
        }
      }
      if(completed === org[0].challenges[req.body.index].tasks.length){
        org[0].challenges[req.body.index].completed = true;
      }else{
        org[0].challenges[req.body.index].completed = false;
      }
      Org.update({_id: req.org._id}, {challenges: org[0].challenges}, {upsert: true}, function(err, item) {
        res.send(org[0].challenges[req.body.index].completed);
    });
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};