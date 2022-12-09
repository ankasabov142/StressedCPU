const router = require('express').Router();

const { isAdmin } = require('../middlewares/guards');

const service = require('../services/discountService');

router.get('/', isAdmin(), async (req, res, next) => {
    try {
        res.json(await service.getAllDiscounts());
    } catch (err) {
        next(err);
    }
});

router.post('/', isAdmin(), async (req, res, next) => {
    try {
        await service.postDiscount(req.body);
        res.json(await service.getAllDiscounts());
    } catch (err) {
        next(err);
    }
});

router.put('/:id', isAdmin(), async (req, res, next) => {
    try {
        await service.updateDiscount(req.params.id, req.body);
        res.json(await service.getAllDiscounts());
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', isAdmin(), async (req, res, next) => {
    try {
        await service.deleteDiscount(req.params.id);
        res.json(await service.getAllDiscounts());
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.caller = 'Discount';
    next(err)
});

module.exports = router;