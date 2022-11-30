const { model } = require('mongoose');

const userSchema = require('./schemas/userSchema');
const gameSchema = require('./schemas/gameSchema');
const schemaWithName = require('./schemas/schemaWithName');

module.exports = {
    User: model('User', userSchema),
    Game: model('Game', gameSchema),
    Category: model('Category', schemaWithName),
    Genre: model('Genre', schemaWithName),
    Tag: model('Tag', schemaWithName),
}