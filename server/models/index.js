const { model } = require('mongoose');

const userSchema = require('./schemas/userSchema');
const gameSchema = require('./schemas/gameSchema');
const orderSchema = require('./schemas/orderSchema');
const discountSchema = require('./schemas/discountSchema');
const schemaWithName = require('./schemas/schemaWithName');
const questionSchema = require('./schemas/questionSchema');
const commentSchema = require('./schemas/commentSchema');
const reviewSchema = require('./schemas/reviewSchema');

module.exports = {
    User: model('User', userSchema),
    Game: model('Game', gameSchema),
    Order: model('Order', orderSchema),
    Discount: model('Discount', discountSchema),
    Category: model('Category', schemaWithName),
    Genre: model('Genre', schemaWithName),
    Tag: model('Tag', schemaWithName),
    Question: model('Question', questionSchema),
    Answer: model('Answer', commentSchema),
    Review: model('Review', reviewSchema),
}