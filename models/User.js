const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
       type: String,
       required: [true, 'is required'],
       unique: true,
       maxlength: [50, 'can not be more than 50 characters'],
       minlength: [8, 'can not be less than 8 characters']
    },
    password: {
        type: String,
        required: [true, 'is required'],
        maxlength: [50, 'can not be more than 50 characters'],
        minlength: [8, 'can not be less than 8 characters'],
        select: false
    },
    email: {
        type: String,
        required: [true, 'is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+/, 'Please add a valid email']
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'lecturer', 'examiner'],
        default: 'student'
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
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createAt: {
        type: Date,
        default: Date.now,
    }
});

//Encrypt password using bcryptjs
UserSchema.pre('save', async function(next) {
    const salt = await bcryptjs.genSalt(10);
    console.log(this);
    this.password = await bcryptjs.hash(this.password, salt);

    next();
})

//Sign JWT and return
UserSchema.methods.getSignedWebToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}

//Match user password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);