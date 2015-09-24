'use script';



var chai = require('chai'),
	sinon = require('sinon'),
	expect = chai.expect;

chai.should();

var Course = require('../src/Course');
var	Student = require('../src/Student');

describe('Course Tests', function() {

	var courseName = 'Intoduction to Awesomeness',
		courseCode = 'AWE 101',
		courseDescription = 'This course will introduce you with awesomeness',
		student;

	beforeEach(function(){
		student = Student.create('John', 9);
	})

	it('should save data correctly', function() {
		var course = Course.create(courseName, courseCode, courseDescription);

		course.should.have.property('name').and.equal(courseName);
		course.should.have.property('code').and.equal(courseCode);
		course.should.have.property('description').and.equal(courseDescription);

		course.should.have.property('students').and.eql([]);
		course.should.have.property('times').and.eql([]);
	});

	describe('register student', function() {

		it('should add the student to students array', function() {
			var course = Course.create(courseName, courseCode, courseDescription);

			course.registerStudent(student);

			course.students.length.should.be.equal(1);
			course.students[0].id.should.be.equal(student.id);
		});
	});


	describe('unregister a student', function(done) {

		it('should remove the student from students list', function() {
			var course = Course.create(courseName, courseCode, courseDescription);
			course.registerStudent(student);

			var retValue = course.unregisterStudent(student.id);
			console.log('=======', retValue);
		});

		it('should throw an error when we try unregister student that is not in the class', function() {
			var course = Course.create(courseName, courseCode, courseDescription);

			expect(function() {
				course.unregisterStudent(student);
			}).to.throw();	

		});
	});


	describe('add days/times', function() {
		it('should add days and times', function() {
			var course = Course.create(courseName, courseCode, courseDescription);

			var days = ['Monday', 'Wednesday', 'Friday'],
				times = ['10:00', '14:00'];

			course.addTimes(days, times);

			course.times.length.should.be.equal(6);
			course.times[2].should.be.eql({
				day: 'Wednesday',
				time: '10:00'
			});
		});

		it('should throw when adding invalid day of week', function() {
			var course = Course.create(courseName, courseCode, courseDescription);

			var day = ['asdad'],
				time = ['10:00'];

			expect(function() {
				course.addTimes(day, time);
			}).to.throw();

		});
	});
















});