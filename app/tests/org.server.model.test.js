'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Org = mongoose.model('Org');

/**
 * Globals
 */
var org, org2;

/**
 * Unit tests
 */
describe('Org Model Unit Tests:', function() {
	before(function(done) {
		org = new Org({
			orgname: 'orgname',
			provider: 'local'
		});
		org2 = new Org({
			orgname: 'orgname',
			provider: 'local'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no orgs', function(done) {
			Org.find({}, function(err, orgs) {
				orgs.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			org.save(done);
		});

		it('should fail to save an existing org again', function(done) {
			org.save();
			return org2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without first name', function(done) {
			org.firstName = '';
			return org.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	after(function(done) {
		Org.remove().exec();
		done();
	});
});