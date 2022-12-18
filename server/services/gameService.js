const { Game } = require("../models");
const validate = require("../util/validators");
const { trimObjectValues } = require("../util/functions");

// TODO: filtration and sorting

async function populateGameQuery(query) {
    return await query
        .populate('categories genres tags discounts')
}

async function getAllGames() {
    return await populateGameQuery(
        Game.find({ quantityInStock: { $gt: 0 } })
            .limit(60)
            .select({
                media: 0,
                description: 0,
                __v: 0
            })
    );
}

async function getGamesByQuery() {

}

async function getGameById(id) {
    try {
        const game = await populateGameQuery(Game.findById(id));

        if (!game) {
            throw new Error();
        }

        return game;
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function postGame({
    name,
    description,
    displayImage,
    media,
    categories,
    genres,
    tags,
    price,
    discounts,
    quantityInStock = 0
}) {
    const obj = {
        name,
        description,
        displayImage,
        media,
        categories,
        genres,
        tags,
        price,
        discounts,
        quantityInStock
    };

    validateGame(obj);

    try {
        return await populateGameQuery(await Game.create(obj));
    } catch (err) {
        err.status = 409;
        throw err;
    }
}

async function editGame(id, {
    name,
    description,
    displayImage,
    media,
    categories,
    genres,
    tags,
    price,
    discounts,
    quantityInStock = 0
}) {
    const obj = {
        name,
        description,
        displayImage,
        media,
        categories,
        genres,
        tags,
        price,
        discounts,
        quantityInStock
    };

    validateGame(obj);

    try {
        return await populateGameQuery(
            Game.findByIdAndUpdate(id, obj)
        );
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteGame(id) {
    try {
        return await Game.findByIdAndDelete(id);
    } catch (err) {
        err.status = 404;
        throw err;
    }
}


function validateGame(game) {
    trimObjectValues(game);

    validate.required(game.name, { name: 'Game name' });
    validate.maxLength(game.name, 250, { name: 'Game name' });

    validate.required(game.description, { name: 'Description' });
    validate.maxLength(game.description, 2500, { name: 'Description' });

    validate.nonEmptyArray(game.categories, { name: 'Categories' });

    validate.nonEmptyArray(game.genres, { name: 'Genres' });

    validate.required(game.price, { name: 'Price' });
}


module.exports = {
    getAllGames,
    getGameById,
    postGame,
    editGame,
    deleteGame
}