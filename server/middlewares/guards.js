const { getIsUserAdmin } = require("../services/userService");

module.exports = {
    isGuest() {
        return (req, res, next) => {
            if (req.user) {
                res.status(400).json({ message: 'You are already signed in' });
            }
            else {
                next();
            }
        }
    },
    isUser() {
        return (req, res, next) => {
            if (!req.user) {
                res.status(403).json({ message: 'Please sign in' });
            }
            else {
                next();
            }
        }
    },
    isAdmin() {
        return (req, res, next) => {
            if (!req.user || !getIsUserAdmin(req.user._id)) {
                res.status(403).json({ message: 'You do not have permission to perform this action' })
            } else {
                req.user.isAdmin = true;
                next();
            }
        }
    }
};