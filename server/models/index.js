const { model } = require('mongoose');

const userSchema = require('./schemas/userSchema');
const gameSchema = require('./schemas/gameSchema');

module.exports = {
    User: model('User', userSchema),
    Game: model('Game', gameSchema),
}