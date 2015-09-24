'use script';

var chai = require('chai'),
	sinon = require('sinon'),
	expect = chai.expect;

chai.should();

var Student = require('../src/Student');


describe('Testing Student', function() {
	var studentName = 'John',
		studentGrade = 5;

	it('should save the info on the student and create new id when created', function() {
		var student = Student.create(studentName, studentGrade);

		student.should.have.property('name').and.equal(studentName);

		student.should.have.property('grade').and.equal(studentGrade);

		student.should.have.property('id');		
	});


	it('should increase student\'s grade by 1 when advanced grade is called', function() {
		var student = Student.create(studentName, studentGrade);

		student.advanceGrade();

		student.grade.should.equal(studentGrade + 1);
	});
});





