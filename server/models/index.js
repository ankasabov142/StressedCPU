const { model } = require('mongoose');

const userSchema = require('./schemas/userSchema');

module.exports = {
    User: model('User', userSchema),
}