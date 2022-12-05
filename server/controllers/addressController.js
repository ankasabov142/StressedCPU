const router = require('express').Router();

const { isUser } = require('../middlewares/guards');
const service = require('../services/addressService');

router.get('/', isUser(), async (req, res, next) => {
    try {
        res.json(await service.getUserAddresses(req.user._id));
    } catch (err) {
        next(err);
    }
});

router.post('/', isUser(), async (req, res, next) => {
    try {
        await service.postAddress(req.user._id, req.body);
        res.json(await service.getUserAddresses(req.user._id));
    } catch (err) {
        next(err);
    }
});

router.put('/:id', isUser(), async (req, res, next) => {
    try {
        await service.updateAddress(req.params.id, req.user._id, req.body);
        res.json(await service.getUserAddresses(req.user._id));
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', isUser(), async (req, res, next) => {
    try {
        await service.deleteAddress(req.params.id, req.user._id);
        res.json(await service.getUserAddresses(req.user._id));
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.caller = 'Address';
    next(err)
});

module.exports = router;