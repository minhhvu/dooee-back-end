var express = require('express');
var router = express.Router();
const {getAllUsers, createUser, deleteUser, getUser} = require('../controllers/users');

//@route /api/v1/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//@route /api/v1/users/:id
router
    .route('/:id')
    .get(getUser)
    .delete(deleteUser);

module.exports = router;
