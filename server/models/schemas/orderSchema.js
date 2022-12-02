const { Schema, Types } = require('mongoose');
const { nonEmptyArray } = require('../../util/modelValidators');

const gameSchema = require('./gameSchema');
const discountSchema = require('./discountSchema.js');

const schema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User'
    },
    products: {
        type: [gameSchema],
        validate: nonEmptyArray
    },
    price: { type: Number, required: true, min: 0 },
    discount: discountSchema
}, { timestamps: true });

module.exports = schema;