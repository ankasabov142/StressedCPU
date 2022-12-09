const { Schema, Types } = require('mongoose');
const { isInteger } = require('../../util/modelValidators');

const schema = new Schema({
    product: {
        _id: { type: Types.ObjectId, required: true },
        name: {
            type: String,
            required: true,
            maxLength: 250
        },
        displayImage: String,
        price: { type: Number, required: true, min: 0 }
    },
    quantity: {
        type: Number,
        required: true,
        validate: isInteger,
        min: 1
    },
}, { _id: false });

module.exports = schema;