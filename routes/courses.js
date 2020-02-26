var express = require('express');
const router = express.Router();
const {getAllCourses, createCourse} = require('../controllers/courses');
const {protect} = require('../middlewares/auth');

//@route /api/v1/courses

router
    .route('/')
    .get(getAllCourses)
    .post(protect, createCourse);

module.exports = router;