const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    console.log('-----------------------------------------');
    console.log(err);

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error',
    })
};

module.exports = errorHandler;