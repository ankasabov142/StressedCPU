const { Genre } = require('../models');
const errorMessages = require('../util/errorMessages');

async function getAllGenres() {
    return await Genre.find().lean();
}

async function postGenre({ name }) {
    name = name?.trim();

    validateGenreName(name);

    return await Genre.create({ name });
}

async function updateGenre(id, { name }) {
    name = name?.trim();

    validateGenreName(name);

    try {
        const g = await Genre.findById(id);
        return await g.updateOne({ name });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteGenre(id) {
    try {
        const g = await Genre.findById(id);
        return await g.deleteOne();
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

function validateGenreName(name) {
    let err;

    if (!name) {
        err = new Error(errorMessages.required("Genre name"));
    }
    else if (name.length > 50) {
        err = new Error(errorMessages.maxLength("Genre name", 50));
    }

    if (err) {
        err.status = 409;
        throw err;
    }
}

module.exports = {
    getAllGenres,
    postGenre,
    updateGenre,
    deleteGenre
}