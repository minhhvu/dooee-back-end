const {getTracks, createTrack, getSingleTrack, updateTrack, deleteTrack} = require('../controllers/tracks');
const {protect, authorize} = require('../middlewares/auth');
const express = require('express');
const router = express.Router();
const {admin, lecturer, student} = require('../config/roles');

router.use(protect);

router
    .route('/')
    .get(getTracks)
    .post(authorize(admin, lecturer), createTrack);

router
    .route('/:id')
    .get(getSingleTrack)
    .put(updateTrack)
    .delete(deleteTrack);

module.exports = router;
