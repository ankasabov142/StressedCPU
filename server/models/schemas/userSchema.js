const { Schema, Types } = require('mongoose');
const { emailRegExp, passwordRegExp } = require('../../util/patterns');

const schema = new Schema({
    isAdmin: Boolean,
    firstName: {
        type: String,
        required: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: emailRegExp,
        maxLength: 320
    },
    password: {
        type: String,
        required: true,
        match: passwordRegExp,
    },
    phoneNumber: { type: String, maxLength: 15 },
    favourites: [{ type: Types.ObjectId, ref: 'Game' }]
});

module.exports = schema;