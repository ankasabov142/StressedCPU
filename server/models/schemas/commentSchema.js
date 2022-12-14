const { Schema, Types } = require('mongoose');

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: Types.ObjectId,
        ref: 'Game',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 2500
    },
    media: [String]
}, { timestamps: true });

module.exports = schema;