const router = require('express').Router();

const { isAdmin } = require('../middlewares/guards');

const service = require('../services/gameService');

router.get('/', async (req, res, next) => {
    try {
        res.json(await service.getAllGames());
    } catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        res.json(await service.getAllGames());
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        res.json(await service.getGameById(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.post('/', isAdmin(), async (req, res, next) => {
    try {
        res.json(await service.postGame(req.body));
    } catch (err) {
        next(err);
    }
});

router.put('/:id', isAdmin(), async (req, res, next) => {
    try {
        res.json(await service.editGame(req.params.id, req.body));
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', isAdmin(), async (req, res, next) => {
    try {
        await service.deleteGame(req.params.id);
        res.json(await service.getAllGames());
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    err.caller = 'Game';
    next(err)
});

module.exports = router;