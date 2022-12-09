const { Schema, Types } = require('mongoose');
const { isInteger } = require('../../util/modelValidators');

const schema = new Schema({
    product: {
        type: Types.ObjectId,
        ref: 'Game',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        validate: isInteger,
        min: 1
    }
}, { _id: false });

module.exports = schema;