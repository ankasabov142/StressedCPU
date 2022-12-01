const { Category } = require('../models');
const errorMessages = require('../util/errorMessages');

async function getAllCategories() {
    return await Category.find().lean();
}

async function postCategory({ name }) {
    name = name?.trim();

    validateCategoryName(name);

    return await Category.create({ name });
}

async function updateCategory(id, { name }) {
    name = name?.trim();

    validateCategoryName(name);

    try {
        const c = await Category.findById(id);
        return await c.updateOne({ name });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteCategory(id) {
    try {
        const c = await Category.findById(id);
        return await c.deleteOne();
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

function validateCategoryName(name) {
    let err;

    if (!name) {
        err = new Error(errorMessages.required("Category name"));
    }
    else if (name.length > 50) {
        err = new Error(errorMessages.maxLength("Category name", 50));
    }

    if (err) {
        err.status = 409;
        throw err;
    }
}

module.exports = {
    getAllCategories,
    postCategory,
    updateCategory,
    deleteCategory
}