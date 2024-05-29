// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        match: [/^[a-zA-Z0-9_-]+$/, 'is invalid'],
        minlength: 3,
        maxlength: 50
    },
    employeeId: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 10
    },
    contactNumber: {
        type: String,
        required: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'is invalid'],
        minlength: 10,
        maxlength: 15
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\..+/, 'is invalid']
    },
    dateOfBirth: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                const today = new Date();
                return value <= today;
            },
            message: 'Date of birth cannot be in the future.'
        }
    },
    dateOfJoining: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                const today = new Date();
                return value <= today;
            },
            message: 'Date of joining cannot be in the future.'
        }
    },
    designation: {
        type: String,
        required: true,
        enum: ['Manager', 'Developer', 'Designer', 'QA', 'HR']
    },
    profilePhoto: {
        type: String // URL or file path to the uploaded profile photo
    },
    offerLetter: {
        type: String // URL or file path to the uploaded offer letter
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100
    }
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
