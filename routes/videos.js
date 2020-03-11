const {getVideos, createVideo, getSingleVideo, updateVideo, deleteVideo} = require('../controllers/Videos');
const {protect, authorize} = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const {admin, lecturer, student} = require('../config/roles');

router.use(protect);

router
    .route('/')
    .get(getVideos)
    .post(authorize(admin, lecturer), createVideo);

router
    .route('/:id')
    .get(getSingleVideo)
    .put(updateVideo)
    .delete(deleteVideo);

module.exports = router;
