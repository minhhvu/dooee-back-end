var express = require('express');
const router = express.Router();
const {getAllCourses, createCourse} = require('../controllers/courses')

//@route /api/v1/courses

router
    .route('/')
    .get(getAllCourses)
    .post(createCourse);

module.exports = router;