const { Schema, Types } = require('mongoose');
const { nonEmptyArray } = require('../../util/modelValidators');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 250
    },
    description: {
        type: String,
        required: true,
        maxLength: 2500
    },
    displayImage: String,
    media: [String],
    categories: {
        type: [{
            type: Types.ObjectId,
            ref: 'Category'
        }],
        validate: nonEmptyArray
    },
    genres: {
        type: [{
            type: Types.ObjectId,
            ref: 'Genre'
        }],
        validate: nonEmptyArray
    },
    tags: [{ type: Types.ObjectId, ref: 'Tag' }],
    price: { type: Number, required: true },
    discounts: [{ type: Types.ObjectId, ref: 'Discount' }],
});

module.exports = schema;