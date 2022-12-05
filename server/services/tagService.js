const { Tag } = require('../models');
const validate = require('../util/validators');

async function getAllTags() {
    return await Tag.find().lean();
}

async function postTag({ name }) {
    name = name?.trim();

    validateTagName(name);

    return await Tag.create({ name });
}

async function updateTag(id, { name }) {
    name = name?.trim();

    validateTagName(name);

    try {
        return await Tag.updateOne({ _id: id }, { name });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteTag(id) {
    try {
        return await Tag.deleteOne({_id: id});
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

function validateTagName(name) {
    validate.required(name, { name: 'Tag name' });
    validate.maxLength(name, 50, { name: 'Tag name' });
}

module.exports = {
    getAllTags,
    postTag,
    updateTag,
    deleteTag
}