
const { Discount } = require('../models');
const validate = require('../util/validators');

async function getAllDiscounts() {
    return await Discount.find();
}

async function postDiscount({ code, percentage, isPromoCode = false }) {
    code = code?.trim();

    validateDiscount({ code, percentage });

    return await Discount.create({ code, percentage, isPromoCode });
}

async function updateDiscount(id, { code, percentage, isPromoCode }) {
    code = code?.trim();

    validateDiscount({code, percentage});

    try {
        return await Discount.updateOne({ _id: id }, { code, percentage, isPromoCode });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteDiscount(id) {
    try {
        return await Discount.deleteOne({ _id: id });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

function validateDiscount({ code, percentage }) {
    validate.required(code, { name: 'Discount code' });
    validate.maxLength(code, 50, { name: 'Discount code' });

    validate.required(percentage, { name: 'Discount percentage' });
    validate.min(percentage, 0, { name: 'Discount percentage' });
    validate.max(percentage, 100, { name: 'Discount percentage' });
}

module.exports = {
    getAllDiscounts,
    postDiscount,
    updateDiscount,
    deleteDiscount
}