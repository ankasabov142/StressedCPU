const { Schema, Types } = require('mongoose');
const { emailRegExp, passwordRegExp } = require('../../util/patterns');

const schema = new Schema({
    isAdmin: Boolean,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: emailRegExp },
    password: { type: String, required: true, match: passwordRegExp },
    phoneNumber: String,
    favourites: [{ type: Types.ObjectId, ref: 'Game' }]
});

module.exports = schema;