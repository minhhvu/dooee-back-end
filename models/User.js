const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, 'is required'],
       unique: true,
       maxlength: [50, 'can not be more than 50 characters'],
       minlength: [8, 'can not be less than 50 characters']
    },
    password: {
        type: String,
        required: [true, 'is required'],
        maxlength: [50, 'can not be more than 50 characters'],
        minlength: [6, 'can not be less than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'is required'],
        unique: true
    },
    role: {
        type: String,
        required: [true, 'is required'],
    },
    actions: {
        type: [String],
    },
    resources: {
        type: [String],
    },
    operations: {
        type: [String],
    },
    creatAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', UserSchema);