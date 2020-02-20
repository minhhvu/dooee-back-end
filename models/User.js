const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, 'Name is required'],
       unique: true,
       maxlength: [50, 'Name can not be more than 50 characters'],
       minlength: [8, 'Name can not be less than 50 characters']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [50, 'Password can not be more than 50 characters'],
        minlength: [6, 'Password can not be less than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Password is required'],
    },
    roles: {
        type: [String],
        required: true,
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