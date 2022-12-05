const router = require('express').Router();

const { isAdmin } = require('../middlewares/guards');

const service = require('../services/tagService');

router.get('/', async (req, res, next) => {
    try {
        res.json(await service.getAllTags());
    } catch (err) {
        next(err);
    }
});

router.post('/', isAdmin(), async (req, res, next) => {
    try {
        await service.postTag(req.body);
        res.json(await service.getAllTags());
    } catch (err) {
        next(err);
    }
});

router.put('/:id', isAdmin(), async (req, res, next) => {
    try {
        await service.updateTag(req.params.id, req.body);
        res.json(await service.getAllTags());
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', isAdmin(), async (req, res, next) => {
    try {
        await service.deleteTag(req.params.id);
        res.json(await service.getAllTags());
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.caller = 'Tag';
    next(err)
});

module.exports = router;