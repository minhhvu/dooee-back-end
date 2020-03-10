const mongoose  = require('mongoose');

const TrackSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'is required.'],
        unique: true,
    },
    slug: String,
    description: {
        type: String,
        required: ['true', 'is required.']
    },
    level: String,
    categories: [String],
    language: String,
    subtitle: [String],
    tags: [String],
    courses: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Course'
        }
    ],
    students: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ],
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

module.exports = mongoose.model('Track', TrackSchema);