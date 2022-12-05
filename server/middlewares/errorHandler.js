const errorMessages = require("../util/errorMessages");

module.exports = (err, req, res, next) => {
    console.dir(err);

    let message = err.message || 'An error occured';
    let status = err.status || 500;

    if (err.code == 11000) {
        const [key, value] = Object.entries(err.keyValue)[0];
        message = errorMessages.unique(`${err.customCaller || err.caller} with ${key}`, value);
        status = 409;
    } else if (err.status == 404) {
        message = errorMessages.notFound(err.customCaller || err.caller);
    } else if (err.name === 'ValidationError') {
        message = "Invalid data provided";
        status = 400;
    }
    res.status(status).json({ message });
}