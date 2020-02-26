var express = require('express');
var router = express.Router();
const {getAllUsers, createUser, deleteUser, getUser} = require('../controllers/users');
const {protect, authorize} = require('../middlewares/auth')

//@route /api/v1/users
router
    .route('/')
    .get(protect, authorize('admin'), getAllUsers)
    .post(createUser);

//@route /api/v1/users/:id
router
    .route('/:id')
    .get(getUser)
    .delete(deleteUser);

module.exports = router;
