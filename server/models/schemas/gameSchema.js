const { Schema, Types } = require('mongoose');
const { nonEmptyArray } = require('../../util/validators');

const schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
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