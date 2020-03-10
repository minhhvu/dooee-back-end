const Course = require('../models/Course');
const asyncHandler = require('../middlewares/async');
const advancedResults = require('../middlewares/advancedResults');
const ErrorResponse = require('../utils/errorResponse');

//@Desc Get all courses
//@route GET /api/v1/courses/
//@access Public
exports.getAllCourses = [advancedResults(Course), asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
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

//@Desc Update course information
//@route /api/v1/courses/:id
//@access Private (only owner)
exports.updateCourse = asyncHandler(async (req, res, next) => {
    //Check for ownership
    let course = await Course.findOne({_id: req.params.id});

    if (!course) {
        return next(new ErrorResponse ('Invalid Course Id', 404));
    }

    if (course.owner.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorized to update course.', 401));
    }

    //Update on database
    const data = req.body;
    ['_id', 'owner', 'creatAt'].forEach(field => delete data[field]); //Fields are not allowed to update
    course = await  Course.findByIdAndUpdate(req.params.id, data, {new: true})

    //Return response
    res.status(200).json({
        success: true,
        data: course
    })
})

//@Desc Delete course
//@route /api/v1/courses/:id
//@access Private (only for owner)

exports.deleteCourse = asyncHandler(async (req, res, next) => {
    //Check for ownership
    let course = await Course.findOne({_id: req.params.id});

    if (!course) {
        return next(new ErrorResponse ('Invalid Course Id', 404));
    }

    if (course.owner.toString() !== req.user.id) {
        return next(new ErrorResponse('Not authorized to update course.', 401));
    }

    await Course.findByIdAndDelete(req.params.id);

    //Return response
    res.status(200).json({
        success: true,
        data: course
    })
})
