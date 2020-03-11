var express = require('express');
const router = express.Router();
const {getAllCourses, createCourse, getSingleCourse, updateCourse, deleteCourse} = require('../controllers/courses');
const {getVideosOfACourse} = require('../controllers/videos');
const {protect, authorize} = require('../middlewares/auth');

//@route /api/v1/courses

router.use(protect);

router
    .route('/')
    .get(getAllCourses)
    .post(authorize('admin'), createCourse);

router
    .route('/:id')
    .get(getSingleCourse)
    .put(updateCourse)
    .delete(deleteCourse);
router
    .route('/:id/videos')
    .get(getVideosOfACourse);

module.exports = router;