const { Schema } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: true, unique: true },
});

module.exports = schema