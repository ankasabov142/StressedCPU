const errorMessages = require("./errorMessages");

function validate(condition, message) {
    if (condition) {
        return true;
    }

    let error = new Error(message);
    error.status = 400;

    throw error;
}

module.exports = {
    required: (value, {
        name = "Value",
        msgPattern = errorMessages.required
    } = {}) => (
        validate(Boolean(value), msgPattern(name))
    ),
    nonEmptyArray: (array, {
        name = "Value",
        msgPattern = errorMessages.required
    } = {}) => (
        validate(Array.isArray(array) && array.length > 0, msgPattern(name))
    ),
    min: (num = -1, bound = 0, {
        orEqual = true,
        name = "Value",
        msgPattern = errorMessages.min
    } = {}) => (
        validate(orEqual
            ? num >= bound
            : num > bound, msgPattern(name, bound))
    ),
    max: (num = -1, bound = 0, {
        orEqual = true,
        name = "Value",
        msgPattern = errorMessages.max
    } = {}) => (
        validate(orEqual
            ? num <= bound
            : num < bound, msgPattern(name, bound))
    ),
    isInteger: (num,
        { name = "Value",
            msgPattern = errorMessages.isInteger
        } = {}) => (
        validate(Number.isInteger(num), msgPattern(name))
    ),
    minLength: (text = '', length = 0, {
        orEqual = true,
        name = "Input",
        msgPattern = errorMessages.minLength
    } = {}) => (
        validate(orEqual
            ? text.length >= length
            : text.length > length, msgPattern(name, length))
    ),
    maxLength: (text = '', length = 250, {
        orEqual = true,
        name = "Input",
        msgPattern = errorMessages.maxLength
    } = {}) => (
        validate(orEqual
            ? text.length <= length
            : text.length < length, msgPattern(name, length))
    ),
    match: (text = '', pattern, {
        matchWhole = true,
        name = "Value",
        msgPattern = errorMessages.invalid
    } = {}) => {
        const result = text.match(pattern);
        const isWholeMatch = matchWhole && result[0] === text;
        return validate(Boolean(result) && isWholeMatch, msgPattern(name, text));
    },
    inCollection: (value, collection, {
        name = "Value",
        collectionName = "option",
        msgPattern = errorMessages.invalid
    } = {}) => (
        validate(collection.includes(value), msgPattern(name, collectionName))
    )
}