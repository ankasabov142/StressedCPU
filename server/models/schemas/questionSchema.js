const { Schema, Types } = require('mongoose');

const commentSchema = require('./commentSchema');

const schema = new Schema({
    question: {
        type: commentSchema,
        required: true
    },
    answers: [{
        type: Types.ObjectId,
        ref: 'Answer'
    }]
});

module.exports = schema;