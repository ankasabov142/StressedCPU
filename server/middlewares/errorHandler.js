const errorMessages = require("../util/errorMessages");

module.exports = (err, req, res, next) => {
    console.dir(err);

    let message = err.message || 'An error occured';
    let status = err.status || 500;

    if (err.code == 11000) {
        const [key, value] = Object.entries(err.keyValue)[0];
        message = errorMessages.unique(`${err.caller} with ${key}`, value);
        status = 409;
    }

    if (err.status == 404) {
        message = errorMessages.notFound(err.caller);
    }

    res.status(status).json({ message });
}