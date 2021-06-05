const mongoose = require('mongoose');

const {
    ErrorCodes,
    createErrorMessage
} = require('../errors.js');

const schema = {
    name: {
        type: String,
        unique: true,
        trim: true,
        required: [
            true,
            createErrorMessage(ErrorCodes.REQUIRED_PROPERTY_NOT_FOUND, 'tour', 'name')
        ]
    },
    maxGroupSize: {
        type: Number,
        required: [
            true,
            createErrorMessage(ErrorCodes.REQUIRED_PROPERTY_NOT_FOUND, 'tour', 'max group size')
        ]
    },
    duration: {
        type: Number,
        required: [
            true,
            createErrorMessage(ErrorCodes.REQUIRED_PROPERTY_NOT_FOUND, 'tour', 'duration')
        ]
    },
    difficulty: {
        type: String,
        required: [
            true,
            createErrorMessage(ErrorCodes.REQUIRED_PROPERTY_NOT_FOUND, 'tour', 'difficulty')
        ]
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [
            true,
            createErrorMessage(ErrorCodes.REQUIRED_PROPERTY_NOT_FOUND, 'tour', 'price')
        ]
    },
    discount: {
        type: Number
    },
    summary: {
        type: String,
        trim: true,
        required: [
            true,
            createErrorMessage(ErrorCodes.REQUIRED_PROPERTY_NOT_FOUND, 'tour', 'summary')
        ]
    },
    description: {
        type: String,
        required: [
            true,
            createErrorMessage(ErrorCodes.REQUIRED_PROPERTY_NOT_FOUND, 'tour', 'description')
        ]
    },
    imageCover: {
        type: String,
        required: [
            true,
            createErrorMessage(ErrorCodes.REQUIRED_PROPERTY_NOT_FOUND, 'tour', 'image cover')
        ]
    },
    images: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    },
    startDates: {
        type: [Date]
    }
};

const mongooseSchema = new mongoose.Schema(schema);
const Tour = new mongoose.model('Tour', mongooseSchema);

module.exports = Tour;
