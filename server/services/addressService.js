const { Address } = require('../models');
const validate = require('../util/errorMessages');
const { trimObjectValues } = require('../util/functions');

async function getUserAddresses(userId) {
    return await Address.find({ userId });
}

async function postAddress(userId, {
    recipientName,
    phoneNumber,
    country,
    city,
    postcode,
    address,
    additionalInfo
}) {
    const obj = {
        userId,
        recipientName,
        phoneNumber,
        country,
        city,
        postcode,
        address,
        additionalInfo
    }

    validateAddress(obj);

    return await Address.create(obj);
}

async function updateAddress(id, userId, {
    recipientName,
    phoneNumber,
    country,
    city,
    postcode,
    address,
    additionalInfo
}) {
    const obj = {
        recipientName,
        phoneNumber,
        country,
        city,
        postcode,
        address,
        additionalInfo
    }

    validateAddress(obj);

    try {
        return await Address.updateOne({ _id: id, userId }, obj);
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function deleteAddress(id, userId) {
    try {
        return await Address.deleteOne({ _id: id, userId });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

function validateAddress(address) {
    trimObjectValues(address);

    validate.required(address.recipientName, { name: 'Recipient name' });
    validate.maxLength(address.recipientName, 250, { name: 'Recipient name' });

    validate.required(address.phoneNumber, { name: 'Phone number' });
    validate.maxLength(address.phoneNumber, 15, { name: 'Phone number' });

    validate.required(address.country, { name: 'Country' });
    validate.maxLength(address.country, 100, { name: 'Country' });

    validate.required(address.city, { name: 'City' });
    validate.maxLength(address.city, 100, { name: 'City' });

    validate.required(address.postcode, { name: 'Postcode' });
    validate.maxLength(address.postcode, 10, { name: 'Postcode' });

    validate.required(address.address, { name: 'Address' });
    validate.maxLength(address.address, 250, { name: 'Address' });

    validate.maxLength(address.additionalInfo, 2500, { name: 'Additional information' });
}

module.exports = {
    getUserAddresses,
    postAddress,
    updateAddress,
    deleteAddress
}