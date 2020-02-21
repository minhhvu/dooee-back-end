const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url_vimeo: {
        type: String,
        required: true
    },
    duration: Number,
    authors: [
        {name: String, user_id: String}
    ],
    language: String,
    subtitle: [String],
    tags: [String],
    description: {
        type: String,
        required: true,
        maxlength: [1000, 'is no more than 1000 characters']
    },
    level: String,
    categories: [String],
    private: Boolean,
    creatAt: {
        type: Date,
        default: Date.now
    },
    createBy: {
        type: {
            name: String,
            userId: String
        }
    }

});

module.exports = CourseSchema;