'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Org Schema
 */
var OrgSchema = new Schema({
	orgname: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in an organization name',
		trim: true
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['org', 'admin']
		}],
		default: ['org']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	tasks:{
		type: Array,
		default: []
	},
	challenges:{
		type: Array,
		default: []
	},
	rewardsObtained:{
		type: Array,
		default: []
	},
	members:{
		type: Array,
		default: []
	},
	admins: {
		type: Array,
		default: []
	}

});

OrgSchema.statics.findUniqueOrgname = function(orgname, suffix, callback) {
	var _this = this;
	var possibleOrgname = orgname + (suffix || '');

	_this.findOne({
		orgname: possibleOrgname
	}, function(err, org) {
		if (!err) {
			if (!org) {
				callback(possibleOrgname);
			} else {
				return _this.findUniqueOrgname(orgname, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

mongoose.model('Org', OrgSchema);