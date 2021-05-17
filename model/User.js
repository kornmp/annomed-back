const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('User', userSchema);