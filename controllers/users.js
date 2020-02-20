const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');

//@desc Get all users
//@route GET /api/v1/users
//access Private for admins only
exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        data: users,
    });
})

//@desc Get a user with ID
//@route GET /api/v1/users/:id
//@access Private for the owner or the admins
exports.getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorResponse(`User not found with id of ${req.params.id}`, 400)
        );
    }

    res.status(200).json({
        success: true,
        data: user
    })
})

//@desc Create a new User
//@route POST /api/v1/users/
//@access Public
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user,
    })
})

//@desc Delete a User
//@route DELETE /api/v1/users/:id
//@access Private for the owner or the admins
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
        res.status(400).json({success: false});
    }

    res.status(200).json({
        success: true,
        data: {}
    })
})