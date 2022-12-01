const router = require('express').Router();

const service = require('../services/genreService');

router.get('/', async (req, res, next) => {
    try {
        res.json(await service.getAllGenres());
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        await service.postGenre(req.body);
        res.json(await service.getAllGenres());
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await service.updateGenre(req.params.id, req.body);
        res.json(await service.getAllGenres());
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await service.deleteGenre(req.params.id);
        res.json(await service.getAllGenres());
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.caller = 'Genre';
    next(err)
});

module.exports = router;