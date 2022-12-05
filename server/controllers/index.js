const userController = require('./userController');
const categoryController = require('./categoryController');
const genreController = require('./genreController');
const tagController = require('./tagController');

function useControllers(app) {
    app.use('/user', userController);
    app.use('/categories', categoryController);
    app.use('/genres', genreController);
    app.use('/tags', tagController);
}

module.exports = useControllers;