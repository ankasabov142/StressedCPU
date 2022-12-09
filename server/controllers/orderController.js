const router = require('express').Router();

const { isUser, isAdmin } = require('../middlewares/guards');

const service = require('../services/orderService');
const { ORDER_STATUS } = require('../util/constants');

function getStatusesFromQuery({ status }) {
    const validStatuses = Object.values(ORDER_STATUS);

    return status?.map(Number)
        .filter(s => validStatuses.includes(s)) || [ORDER_STATUS.AWAITING_CONFIRMATION];
}

router.get('/', isAdmin(), async (req, res, next) => {
    try {
        console.log(req.query);

        const statuses = getStatusesFromQuery(req.query);

        res.json(await service.getOrders(statuses));
    } catch (err) {
        next(err);
    }
});

router.get('/:id', isUser(), async (req, res, next) => {
    try {
        res.json(await service.getOrderDetails({ user: req.user, orderId: req.params.id }));
    } catch (err) {
        next(err);
    }
});

router.get('/user', isUser(), async (req, res, next) => {
    try {
        res.json(await service.getUserOrders(req.user._id));
    } catch (err) {
        next(err);
    }
});

router.post('/', isUser(), async (req, res, next) => {
    try {
        res.json(await service.makeOrder({ userId: req.user._id, ...req.body }));
    } catch (err) {
        next(err);
    }
});

router.post('/confirm/:id', isAdmin(), async (req, res, next) => {
    try {
        res.json(await service.confirmOrder(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.post('/send/:id', isAdmin(), async (req, res, next) => {
    try {
        res.json(await service.sendOrder(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.post('/fulfill/:id', isAdmin(), async (req, res, next) => {
    try {
        res.json(await service.fulfillOrder(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.post('/cancel/:id', isAdmin(), async (req, res, next) => {
    try {
        res.json(await service.cancelOrder(req.params.id));
    } catch (err) {
        next(err);
    }
});

router.post('/return/:id', isAdmin(), async (req, res, next) => {
    try {
        res.json(await service.returnOrder(req.params.id));
    } catch (err) {
        next(err);
    }
});


router.use((err, req, res, next) => {
    err.caller = 'Order';
    next(err)
});

module.exports = router;