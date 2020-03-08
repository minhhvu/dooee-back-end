var express = require('express');
const router = express.Router();
const {getAllCourses, createCourse, getSingleCourse, updateCourse, deleteCourse} = require('../controllers/courses');
const {protect, authorize} = require('../middlewares/auth');

//@route /api/v1/courses

router
    .route('/')
    .get(getAllCourses)
    .post(protect, authorize('admin'), createCourse);

router
    .route('/:id')
    .get(protect, getSingleCourse)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse);

module.exports = router;