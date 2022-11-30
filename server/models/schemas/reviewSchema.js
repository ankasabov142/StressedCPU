const { Schema } = require('mongoose');

const commentSchema = require('./commentSchema');

const schema = new Schema({
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: commentSchema,
        required: true
    }
});

module.exports = schema;