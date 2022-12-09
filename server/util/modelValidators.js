module.exports = {
    nonEmptyArray: (value) => Array.isArray(value) && value.length > 0,
    inCollection: (collection) => (value) => collection.includes(value),
    isInteger: (value) => Number.isInteger(value) 
}