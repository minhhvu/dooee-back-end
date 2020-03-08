const Course = require('../models/Course');
const asyncHandler = require('../middlewares/async');
const advancedResults = require('../middlewares/advancedResults');
// const {authorize, protect} = require('../middlewares/auth')

//@Desc Get all courses
//@route GET /api/v1/courses/
//@access Public
exports.getAllCourses = [advancedResults(Course), asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})]

//@Desc Create a new course
//@route POST /api/v1/courses/
//@access Private for admins or lecturers
exports.createCourse = asyncHandler(async (req, res, next) => {
    const courseInfor = {...req.body};
    courseInfor.owner = req.user.id;

    const user = await Course.create(courseInfor);

    res.status(201).json({
        success: true,
        data: user
    })
})

//@Desc Get single course
//@route GET /api/v1/courses/:id
//@access Private

exports.getSingleCourse = asyncHandler( async (req, res, next) => {
    const course = await Course.findById(req.params.id).select('-owner -creatAt');

    res.status(200).json({
        success: true,
        data: course
    })
})

//@Desc
//@route
//@access

//@Desc
//@route
//@access