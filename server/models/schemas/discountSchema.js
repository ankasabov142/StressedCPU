const { Schema } = require('mongoose');

const schema = new Schema({
    code: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    isPromoCode: Boolean
});

module.exports = schema;