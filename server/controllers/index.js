const addressController = require('./addressController');
const userController = require('./userController');
const gameController = require('./gameController');
const shoppingCartController = require('./shoppingCartController');
const orderController = require('./orderController');
const categoryController = require('./categoryController');
const genreController = require('./genreController');
const tagController = require('./tagController');

function useControllers(app) {
    app.use('/user', userController);
    app.use('/addresses', addressController);
    app.use('/games', gameController);
    app.use('/cart', shoppingCartController);
    app.use('/orders', orderController);
    app.use('/categories', categoryController);
    app.use('/genres', genreController);
    app.use('/tags', tagController);
}

module.exports = useControllers;