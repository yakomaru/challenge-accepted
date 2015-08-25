'use strict';

var _ = require('lodash'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Org = mongoose.model('Org');


// gets all orgs from user -get
exports.getAllUserOrg = function(req, res){
  if(req.user){
    return User.find({_id: req.user._id}, function(err, item){
      res.send(item);
    });
  } else {
    return res.status(400).send({
      message: 'User is not signed in'
    });
  }
};

// adds org to array
exports.createOrg = function(req, res){
  if(req.user){
    return User.find({_id: req.user._id}, function(err, user){
      Org.find({_id: req.body._id}, function(err,item){
        user[0].org.push(item[0]); //referenced copy? or is db immune?
        User.update({_id: req.user._id}, {org: user[0].org}, {upsert: true}, function(err, item) {
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

