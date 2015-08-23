// 'use strict';

// /**
//  * Module dependencies.
//  */
// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;


// /**
//  * User Schema
//  */
// var OrgSchema = new Schema({
// 	orgname: {
// 		type: String,
// 		unique: 'testing error message',
// 		required: 'Please fill in a organization name',
// 		trim: true
// 	},
// 	displayName: {
// 		type: String,
// 		trim: true
// 	},
// 	provider: {
// 		type: String,
// 		required: 'Provider is required'
// 	},
// 	providerData: {},
// 	additionalProvidersData: {},
// 	roles: {
// 		type: [{
// 			type: String,
// 			enum: ['org', 'admin']
// 		}],
// 		default: ['org']
// 	},
// 	updated: {
// 		type: Date
// 	},
// 	created: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	tasks:{
// 		type: Array,
// 		default: []
// 	},
// 	challenges:{
// 		type: Array,
// 		default: []
// 	},
// 	rewardsObtained:{
// 		type: Array,
// 		default: []
// 	},
// 	members:{
// 		type: Array,
// 		default: []
// 	}

// });


// mongoose.model('Org', OrgSchema);