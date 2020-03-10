const Track = require('../models/Track');
const advancedResults= require('../middlewares/advancedResults');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');


//@desc Get all track
//@route GET /api/v1/tracks
//@access Private
exports.getTracks = [advancedResults(Track), asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})]