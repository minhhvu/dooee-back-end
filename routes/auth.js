const {register, login, getMe, forgotPassword, resetPassword, logout} = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const {protect} = require('../middlewares/auth');

router.post('/register', register);

router.post('/login', login);

router.get('/me', protect, getMe);

router.post('/forgotPassword', forgotPassword);

router.put('/resetPassword/:resetToken', resetPassword);

router.get('/logout', protect, logout);

module.exports = router;