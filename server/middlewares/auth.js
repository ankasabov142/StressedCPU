const jwt = require('jsonwebtoken');
const { invalidSession } = require('../util/errorMessages');

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    try {
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
        }
        next();
    } catch (err) {
        res.status(401).json({ message: invalidSession() })
    }
};