const { Game } = require("../models");
const validate = require("../util/validators");
const { trimObjectValues } = require("../util/functions");

// TODO: filtration and sorting

async function populateGameQuery(query) {
    return await query
        .populate('categories')
        .populate('genres')
        .populate('tags')
        .populate('discounts')
}

async function getAllGames() {
    return await populateGameQuery(
        Game.find()
            .limit(60)
            .select({
                media: 0,
                description: 0,
                __v: 0
            })
    );
}

async function getGameById(id) {
    try {
        return await Game.findById(id)
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
    discounts
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
        discounts
    };

    validateGame(obj);

    try {
        return await populateGameQuery(Game.create(obj));
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
    discounts
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
        discounts
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
        return await Game.findByIdAndDelete(id)
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