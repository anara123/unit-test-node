'use strict';


var chai = require('chai'),
	expect = chai.expect,
	should = chai.should();


var Student = require('../src/Student'),
	Course = require('../src/Course'),
	DataLoader = require('../src/DataLoader');

var dataLoader = new DataLoader();

describe('DataLoader tests.', function() {

	it('gets a student syncronously', function() {
		var student = dataLoader.getStudentSync(1);

		student.should.exist;
		student.should.have.property('name').and.equal("John Doe");
	});


	it('get a student asyncronously', function(done) {
		
		dataLoader.getStudent(1, function(student) {
			
			student.should.exist;
			student.should.have.property('name').and.equal("John Doe");

			done();
		})
	});

});