const mongoose  = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'is required.'],
        unique: true,
    },
    slug: String,
    description: {
        type: String,
    },
    url_vimeo: {
        type: String,
        unique: true,
        required: [true, 'is required.'],
    },
    categories: [String],
    language: String,
    subtitle: [String],
    tags: [String],
    courses:{
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Video', VideoSchema);