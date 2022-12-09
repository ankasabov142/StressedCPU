const { Schema, Types } = require('mongoose');
const { nonEmptyArray, inCollection } = require('../../util/modelValidators');
const { ORDER_STATUS } = require('../../util/constants');

const orderProductSchema = require('./orderProductSchema');
const addressSchema = require('./addressSchema');

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    address: {
        type: addressSchema,
        required: true
    },
    products: {
        type: [orderProductSchema],
        required: true,
        validate: nonEmptyArray
    },
    status: {
        type: Number,
        validate: inCollection(Object.values(ORDER_STATUS))
    },
    price: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = schema;