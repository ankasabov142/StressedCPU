const { Genre } = require('../models');
const validate = require('../util/validators');

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
        return await Genre.updateOne({ _id: id }, { name });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteGenre(id) {
    try {
        return await Genre.deleteOne({ _id: id });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

function validateGenreName(name) {
    validate.required(name, { name: 'Genre name' });
    validate.maxLength(name, 50, { name: 'Genre name' });
}

module.exports = {
    getAllGenres,
    postGenre,
    updateGenre,
    deleteGenre
}