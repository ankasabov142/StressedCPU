const router = require('express').Router();

const service = require('../services/categoryService');

router.get('/', async (req, res, next) => {
    try {
        res.json(await service.getAllCategories());
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        await service.postCategory(req.body);
        res.json(await service.getAllCategories());
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await service.updateCategory(req.params.id, req.body);
        res.json(await service.getAllCategories());
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await service.deleteCategory(req.params.id);
        res.json(await service.getAllCategories());
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.caller = 'Category';
    next(err)
});

module.exports = router;