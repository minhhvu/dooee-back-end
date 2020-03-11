const Video = require('../models/Video');
const advancedResults= require('../middlewares/advancedResults');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const {admin, lecturer, student} = require('../config/roles');


//@desc Get all videos
//@route GET /api/v1/videos
//@access Private (only admins)
exports.getVideos = [advancedResults(Video), asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})]

//@desc Get all videos with the same course id
//@route GET /api/v1/courses/:id/videos
//@access Private
exports.getVideosOfACourse = asyncHandler(async (req, res, next) => {
    res.redirect('/api/v1/videos?course='+req.params.id);
})


//@desc Create a video
//@route POST /api/v1/videos
//@access Private (only for admins or lecturers)
exports.createVideo = asyncHandler(async (req, res, next) => {
    //Manage the fields
    const reqBody = {...req.body};
    ['owner', 'students'].forEach(field => delete reqBody[field]);

    //Add owner information
    reqBody.owner = req.user.id;

    const video = await Video.create(reqBody);

    res.status(201).json({
        success: true,
        data: video
    })
});

//@desc get a video
//@route GET /api/v1/videos/:id
//@access Private
exports.getSingleVideo = asyncHandler(async (req, res, next) => {
    const video = await Video.findById(req.params.id);

    if (!video) {
        return next(new ErrorResponse('Invalid video Id'), 400);
    }

    res.status(201).json({
        success: true,
        data: video
    })
});

//@desc Update a video
//@route PUT /api/v1/videos/:id
//@access Private (only for owner or admin)
exports.updateVideo = asyncHandler(async (req, res, next) => {
    let video = await Video.findById(req.params.id);

    if (!video) {
        return next(new ErrorResponse('Invalid video Id'), 400);
    }

    if (video.owner.toString() !== req.user.id || req.user.role.toString() !== admin){
        return next(new ErrorResponse('Not authorized to update course.', 401));
    }

    //Manage the field
    const reqBody = {...req.body};
    ['owner', 'createAt', '_id'].forEach(field => delete reqBody[field]);

    video = await Video.findByIdAndUpdate(req.params.id, reqBody, {new: true});

    res.status(200).json({
        success: true,
        data: video
    })
});

//@desc Delete a video
//@route PUT /api/v1/videos/:id
//@access Private (only for owners or admins)
exports.deleteVideo = asyncHandler(async (req, res, next) => {
    let video = await Video.findById(req.params.id);

    if (!video) {
        return next(new ErrorResponse('Invalid video Id'), 400);
    }

    if (video.owner.toString() !== req.user.id || req.user.role !== 'admin'){
        return next(new ErrorResponse('Not authorized to update course.', 401));
    }

    video = await Video.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: 'Delete the video successfully.'
    })
});

