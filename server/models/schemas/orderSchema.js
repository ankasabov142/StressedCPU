const { Schema, Types } = require('mongoose');
const { nonEmptyArray } = require('../../util/validators');

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
    price: { type: Number, required: true },
    discount: discountSchema
});

module.exports = schema;