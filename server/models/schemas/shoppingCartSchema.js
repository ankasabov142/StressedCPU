const { Schema, Types } = require('mongoose');
const { nonEmptyArray } = require('../../util/modelValidators');

const shoppingCartProductSchema = require('./shoppingCartProductSchema');

const schema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    products: {
        type: [shoppingCartProductSchema],
        required: true,
        validate: nonEmptyArray
    }
});

module.exports = schema;