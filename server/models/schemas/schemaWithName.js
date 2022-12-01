const { Schema } = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
});

module.exports = schema