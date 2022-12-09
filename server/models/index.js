const { model } = require('mongoose');

const userSchema = require('./schemas/userSchema');
const addressSchema = require('./schemas/addressSchema');
const gameSchema = require('./schemas/gameSchema');
const orderSchema = require('./schemas/orderSchema');
const shoppingCartSchema = require('./schemas/shoppingCartSchema');
const discountSchema = require('./schemas/discountSchema');
const schemaWithName = require('./schemas/schemaWithName');
const questionSchema = require('./schemas/questionSchema');
const commentSchema = require('./schemas/commentSchema');
const reviewSchema = require('./schemas/reviewSchema');

shoppingCartSchema.post('updateMany', async function () {
    await ShoppingCart.deleteMany({ products: { $size: 0 } });
})

const ShoppingCart = model('ShoppingCart', shoppingCartSchema);

gameSchema.post('findOneAndDelete', async function (game) {
    await ShoppingCart.updateMany({}, { $pull: { products: { product: game._id } } });
})

module.exports = {
    User: model('User', userSchema),
    Address: model('Address', addressSchema),
    Order: model('Order', orderSchema),
    ShoppingCart,
    Game: model('Game', gameSchema),
    Discount: model('Discount', discountSchema),
    Category: model('Category', schemaWithName),
    Genre: model('Genre', schemaWithName),
    Tag: model('Tag', schemaWithName),
    Question: model('Question', questionSchema),
    Answer: model('Answer', commentSchema),
    Review: model('Review', reviewSchema),
}