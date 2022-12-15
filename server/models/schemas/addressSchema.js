const { Schema, Types } = require('mongoose');

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipientName: {
        type: String,
        required: true,
        maxLength: 250
    },
    phoneNumber: {
        type: String,
        required: true,
        maxLength: 15
    },
    country: {
        type: String,
        required: true,
        maxLength: 100
    },
    city: {
        type: String,
        required: true,
        maxLength: 100
    },
    postcode: {
        type: String,
        required: true,
        maxLength: 10
    },
    address: {
        type: String,
        required: true,
        maxLength: 250
    },
    additionalInfo: {
        type: String,
        maxLength: 2500
    }
});

module.exports = schema;