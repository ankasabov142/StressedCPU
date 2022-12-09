const router = require('express').Router();

const { isUser } = require('../middlewares/guards');

const service = require('../services/shoppingCartService');

router.get('/', isUser(), async (req, res, next) => {
    try {
        res.json(await service.getUserCart(req.user._id));
    } catch (err) {
        next(err);
    }
});

router.post('/add', isUser(), async (req, res, next) => {
    try {
        res.json(await service.addProduct(req.user._id, req.body));
    } catch (err) {
        next(err);
    }
});

router.post('/remove', isUser(), async (req, res, next) => {
    try {
        res.json(await service.removeProduct(req.user._id, req.body));
    } catch (err) {
        next(err);
    }
});

router.delete('/product/:gameId', isUser(), async (req, res, next) => {
    try {
        res.json(await service.removeProduct(req.user._id, {
            gameId: req.params.gameId,
            quantity: 0
        }));
    } catch (err) {
        next(err);
    }
});

router.delete('/', isUser(), async (req, res, next) => {
    try {
        res.json(await service.emptyCart(req.user._id));
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.caller = 'Shopping cart';
    next(err)
});

module.exports = router;