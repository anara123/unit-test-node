'use strict';

function Course() {};

Course.create = function(name, code, description) {
	var course = new Course();

	course.name = name;
	course.code = code;
	course.description = description;

	course.students = [];
	course.times = [];
 
	return course;
};



var _p = Course.prototype;

_p.registerStudent = function(student) {
	this.students.push(student);
};

_p.unregisterStudent = function(studentId) {
	var me = this;

	if(!this.students.some(function(student, i) {
		if(student.id === studentId) {
			me.students.splice(i, 1);
			console.log('*****');
			return true;
		}
	})) {
		throw new Error('Student ' + studentId + ' is not registered for this course');
	}

	return true;
};


var validDays = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Sunday',
	'Suterday'
];

_p.addTimes = function(days, times) {
	var me = this;

	if (!Array.isArray(days)){
		days = [days];
	}

	if (!Array.isArray(times)) {
		times = [times];
	}

	days.forEach(function(day) {

		if (validDays.indexOf(day) === -1) {
			throw new Error(day + ' is not a valid day');
		}

		times.forEach(function(time) {
			me.times.push({
				'day': day,
				'time': time
			});
		});
	});
};

_p.showSchedule = function(){ 
	var scheduleString = '';
	var first = true;


	this.times.forEach(function(time) {
		if (!first) {
			scheduleString += "\n";
		}
		first = false;

		scheduleString += time.day + 'at' + time.time;
	});

	return scheduleString;
};

_p.showStudents = function() {
	var studentsString = '';
	var first = true;


	this.students.forEach(function(student) {
		if (!first) {
			studentsString += "\n";
		}
		first = false;

		studentsString += student.toString();
	});

	return studentsString;
};



module.exports = Course;