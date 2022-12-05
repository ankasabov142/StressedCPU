const { Category } = require('../models');
const validate = require('../util/validators');

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
        const category = await Category.findById(id);
        return await category.updateOne({ name });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteCategory(id) {
    try {
        const category = await Category.findById(id);
        return await category.deleteOne();
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

function validateCategoryName(name) {
    validate.required(name, { name: 'Genre name' });
    validate.maxLength(name, 50, { name: 'Genre name' });
}

module.exports = {
    getAllCategories,
    postCategory,
    updateCategory,
    deleteCategory
}