// studentModel.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: Number,
        required: true,
        unique: true
    },
    mark: {
        type: Number,
        required: true
    }
});

const Student = mongoose.model('Student', studentSchema); // Changed 'Students' to 'Student'

module.exports = Student;
