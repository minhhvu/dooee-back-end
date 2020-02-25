const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const asyncHandler = require('../middlewares/async');

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

//Send token from model, create cookie and return response
const sendTokenResponse = (user, statusCode, data, res) => {
    //Create a token
    const token =  user.getSignedWebToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE *24*60*60*1000),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        data
    })
}