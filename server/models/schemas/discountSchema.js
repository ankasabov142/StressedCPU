const { Schema } = require('mongoose');

const schema = new Schema({
    code: { type: String, required: true },
    percentage: { type: Number, required: true },
    isPromoCode: Boolean
});

module.exports = schema;