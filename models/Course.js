const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'is required.'],
    },
    url_vimeo: {
        type: String,
        unique: true,
        required: [true, 'is required.'],
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
    access: String,
    creatAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Course', CourseSchema);