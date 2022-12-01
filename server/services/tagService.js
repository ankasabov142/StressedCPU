const { Tag } = require('../models');
const errorMessages = require('../util/errorMessages');

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
        const t = await Tag.findById(id);
        return await t.updateOne({ name });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteTag(id) {
    try {
        const t = await Tag.findById(id);
        return await t.deleteOne();
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

function validateTagName(name) {
    let err;

    if (!name) {
        err = new Error(errorMessages.required("Tag name"));
    }
    else if (name.length > 50) {
        err = new Error(errorMessages.maxLength("Tag name", 50));
    }

    if (err) {
        err.status = 409;
        throw err;
    }
}

module.exports = {
    getAllTags,
    postTag,
    updateTag,
    deleteTag
}