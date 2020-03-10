const Track = require('../models/Track');
const advancedResults= require('../middlewares/advancedResults');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const {admin, lecturer, student} = require('../config/roles');


//@desc Get all track
//@route GET /api/v1/tracks
//@access Private
exports.getTracks = [advancedResults(Track), asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})]


//@desc Create a track
//@route POST /api/v1/tracks
//@access Private (only for admin)
exports.createTrack = asyncHandler(async (req, res, next) => {
    //Manage the fields
    const reqBody = {...req.body};
    ['owner', 'students'].forEach(field => delete reqBody[field]);

    //Add owner information
    reqBody.owner = req.user.id;

    const track = await Track.create(reqBody);

    res.status(201).json({
        success: true,
        data: track
    })
});

//@desc get a track
//@route GET /api/v1/tracks/:id
//@access Private
exports.getSingleTrack = asyncHandler(async (req, res, next) => {
    const track = await Track.findById(req.params.id);

    if (!track) {
        return next(new ErrorResponse('Invalid Track Id'), 400);
    }

    res.status(201).json({
        success: true,
        data: track
    })
});

//@desc Update a track
//@route PUT /api/v1/tracks/:id
//@access Private (only for owner)
exports.updateTrack = asyncHandler(async (req, res, next) => {
    let track = await Track.findById(req.params.id);

    if (!track) {
        return next(new ErrorResponse('Invalid Track Id'), 400);
    }

    if (track.owner.toString() !== req.user.id || req.user.role.toString() !== admin){
        return next(new ErrorResponse('Not authorized to update course.', 401));
    }

    //Manage the field
    const reqBody = {...req.body};
    ['owner', 'students', 'courses', 'createAt', '_id'].forEach(field => delete reqBody[field]);

    track = await Track.findByIdAndUpdate(req.params.id, reqBody, {new: true});

    res.status(200).json({
        success: true,
        data: track
    })
});

//@desc Delete a track
//@route PUT /api/v1/tracks/:id
//@access Private (only for owner or admin)
exports.deleteTrack = asyncHandler(async (req, res, next) => {
    let track = await Track.findById(req.params.id);

    if (!track) {
        return next(new ErrorResponse('Invalid Track Id'), 400);
    }

    if (track.owner.toString() !== req.user.id || req.user.role !== 'admin'){
        return next(new ErrorResponse('Not authorized to update course.', 401));
    }

    track = await Track.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: 'Delete the track successfully.'
    })
});

