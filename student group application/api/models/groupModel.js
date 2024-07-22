// groupModel.js

const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    limit: {
        type: Number,
        required: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' // Referencing the Student model
    }]
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
