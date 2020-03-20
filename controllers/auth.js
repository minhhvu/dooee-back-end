const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');
const sendMail = require('../utils/sendEmail');
const crypto = require('crypto');


//@desc Register user
//@route POST /api/v1/auth/register
//@access public

exports.register = asyncHandler(async (req, res, next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    sendTokenResponse(user, 200, user, res);
});

//@desc Login
//@route POST /api/v1/auth/login
//@access public
exports.login = asyncHandler(async (req, res, next) =>{
    const {email, password} = req.body;

    //Validate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please provide an email and password'), 400)
    }

    //Check user
    const user = await User.findOne({email}).select('+password');

    if (!user){
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    //Match password
    const isMatch = await user.matchPassword(password);

    if (!isMatch){
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    sendTokenResponse(user, 200, {}, res);
})

//@desc Logout
//@route GET /api/v1/auth/logout
//@access private
exports.logout = asyncHandler(async (req, res, next) => {

    res.cookie('token', 'none', {
        expire: new Date(Date.now() + 10 * 1000), //Expire for 10 seconds
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        data: {}
    })
})

//@desc Get the current user information
//@route GET /api/v1/auth/me
//@access Private

exports.getMe = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user,
    })
});


//@decs Forget password
//@route POST /api/v1/auth/forgotPassword
//@access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user){
        return next(new ErrorResponse('There is no email with that email.', 404))
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    //Create reset url
    const url = `${req.protocol}://${req.get('host')}/api/v1/resetPassword/${resetToken}`;

    const message = `You are receiving this email because you has requested the reset of a password. Please make a put request to: \n\n${url}`;
    try {
        await sendMail({
            email: user.email,
            subject: 'Password reset token',
            message
        })
    } catch (e) {
        console.log(e);

        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save({validateBeforeSave: false});

        return next (new ErrorResponse('Email could not be sent.', 500))
    }

    res.status(200).json({
        success:true,
        data: "Email was sent."
    })

});

exports.resetPassword = asyncHandler( async (req, res, next) =>{
    //Get hashed token
    let resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });


    if (!user){
        return next(new ErrorResponse('Invalid Token', 400));
    }

    //Set New Password
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    sendTokenResponse(user, 200, {}, res);
})

//Send token from model, create cookie and return response
const sendTokenResponse = (user, statusCode, data, res, milisecond = 24*60*60*1000) => {
    //Create a token
    const token =  user.getSignedWebToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * milisecond),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        data
    })
}