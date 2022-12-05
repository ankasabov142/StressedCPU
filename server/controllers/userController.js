const router = require('express').Router();

const { isGuest, isUser } = require('../middlewares/guards');
const service = require('../services/userService');

router.post('/login', isGuest(), async (req, res, next) => {
    try {
        res.json(await service.login(req.body));
    } catch (err) {
        next(err);
    }
});

router.post('/login/token', isGuest(), async (req, res, next) => {
    try {
        res.json(await service.loginByToken(req.body.accessToken));
    } catch (err) {
        next(err);
    }
});

router.post('/register', isGuest(), async (req, res, next) => {
    try {
        res.json(await service.register(req.body));
    } catch (err) {
        next(err);
    }
});

router.put('/edit/:id', isUser(), async (req, res, next) => {
    try {
        res.json(await service.editUser(req.params.id || req.user._id, req.body));
    } catch (err) {
        next(err);
    }
});

router.post('/favourites', isUser(), async (req, res, next) => {
    try {
        res.json(await service.addFavourite({ userId: req.user._id, ...req.body }));
    } catch (err) {
        next(err);
    }
});

router.delete('/favourites/:id', isUser(), async (req, res, next) => {
    try {
        res.json(await service.removeFavourite({ userId: req.user._id, gameId: req.params.id }));
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.caller = 'User';
    next(err)
});

module.exports = router;