const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');

const User = require('../models/User');

//Protect Route

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    //Make sure the token exist
    if (!token){
        return next(new ErrorResponse('Not authorize to access the route', 401));
    }

    try{
        //Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();

    } catch (e) {
        return next(new ErrorResponse('Not authorize to access the route', 401));
    }

});

module.exports = protect;