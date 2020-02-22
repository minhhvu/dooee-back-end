const Course = require('../models/Course');
const asyncHandler = require('../middlewares/async');

//@Desc Get all courses
//@route GET /api/v1/courses/
//@access Private only for admins
exports.getAllCourses = asyncHandler(async (req, res, next) => {
    const courses = await Course.find();

    res.status(200).json({
        success: true,
        data: courses
    })
})

//@Desc Create a new course
//@route POST /api/v1/courses/
//@access Private for admins or lecturers
exports.createCourse = asyncHandler(async (req, res, next) => {
    const user = await Course.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    })
})

//@Desc
//@route
//@access

//@Desc
//@route
//@access

//@Desc
//@route
//@access