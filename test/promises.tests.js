'use strict';


var chai = require('chai'),
	chaiAsPromised = require('chai-as-promised'),
	should = chai.should(),
	Promise = require('bluebird');


chai.use(chaiAsPromised);



var student = { name: 'John Doe', id:3 };

var dataAccess = {
	getStudent: function(id) {
		if (id === 3) {
			return Promise.resolve(student);
		}
		else {
			return Promise.reject('Invalid student id');
		}
	}
};


describe('Promises - getStudent', function() {
	it('uses the done function', function(done) {
		dataAccess.getStudent(3)
			.then(function(student) {

				student.should.exist;
				student.should.have.property('name').and.equal('John Doe');

				done();
			});
	});

	it('should fulfils the promise', function() {
		return dataAccess.getStudent(3);
	});

	it('fulfils the promise properly', function() {
		return dataAccess.getStudent(3).should.eventually.equal(student);
	})
});