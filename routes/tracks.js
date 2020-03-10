const {getTracks} = require('../controllers/tracks');
const {protect, authorize} = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router
    .route('/')
    .get(protect, getTracks);

module.exports = router;
