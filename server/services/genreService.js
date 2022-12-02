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
    validate.required(name, { name: 'Genre name' });
    validate.maxLength(name, 50, { name: 'Genre name' });
}

module.exports = {
    getAllGenres,
    postGenre,
    updateGenre,
    deleteGenre
}