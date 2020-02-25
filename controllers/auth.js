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

    const token = user.getSignedWebToken();

    res.status(200).json({
        success: true,
        data: user,
        token
    })
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

    const token = await user.getSignedWebToken();


    res.status(200).json({
        success: true,
        token,
    })
})