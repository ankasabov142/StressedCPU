const { Order, Address, Game, Discount } = require("../models");
const { ORDER_STATUS } = require("../util/constants");
const errorMessages = require("../util/errorMessages");
const { getUserCart } = require("./shoppingCartService");

const getSelectionString = () => 'status price products.product.name'

async function getUserOrders(userId) {
    return await Order.find({ userId });
}

async function getOrders(statuses) {
    try {
        return await Order.find({ status: { $in: statuses } });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function getOrderDetails({ user, orderId }) {
    try {
        const order = await Order.findById(orderId).select(getSelectionString());

        if (order.userId !== user._id && !user.isAdmin) {
            const err = new Error();
            err.status = 403;
            err.message = errorMessages.accessDenied();
        }

        return order;
    } catch (err) {
        if (!err.status)
            err.status = 404;

        throw err;
    }
}

async function makeOrder({ userId, addressId, discountCode }) {
    let products = await getUserCart(userId);

    let address;
    try {
        address = await Address.findById(addressId);
    } catch (err) {
        err.status = 404;
        err.customCaller = 'Address';
        throw err;
    }

    let totalOrderPrice = 0;

    products = products.map(p => {
        if (p.product.quantityInStock < p.quantity) {
            const err = new Error(`${p.quantity} x ${p.product.name} - insufficient amount in stock :(`);
            err.status = 409;
            throw err;
        }

        let pricePercentage = Math.max(
            p.product.discounts.reduce((percentage, discount) => percentage - discount.percentage, 100),
            0
        )

        const price = (pricePercentage / 100) * p.product.price;

        totalOrderPrice += p.quantity * price;

        return {
            product: {
                _id: p.product._id,
                name: p.product.name,
                displayImage: p.product.displayImage,
                price
            },
            quantity: p.quantity
        }
    });

    let discount;
    if (discountCode) {
        try {
            discount = await Discount.findOne({ code: discountCode });

            if (!discount.isPromoCode) {
                throw new Error();
            }

            totalOrderPrice *= (100 - discount.percentage) / 100;
        } catch (err) {
            err.status = 404;
            err.customCaller = 'Discount';
            throw err;
        }
    }


    
    for (const item of products) {
        await Game.updateOne({ _id: item.product._id }, { $inc: { quantityInStock: -1 } });
    }

    return await Order.create({
        userId,
        address,
        products,
        status: ORDER_STATUS.AWAITING_CONFIRMATION,
        price: totalOrderPrice
    });
}

async function setOrderStatus(orderId, status) {
    try {
        const res = await Order.updateOne({ _id: orderId }, { status });
        return res.acknowledged && res.matchedCount !== 0;
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function setOrderStatusAndReturnProducts(orderId, status) {
    try {
        const order = await Order.findById(orderId);

        if (order.status === status) {
            const err = new Error(`Order status is already set to ${Object.keys(ORDER_STATUS)[status]}`)
            err.status = 409;
            throw err;
        }

        let res = await order.updateOne({ status });
        res = res.acknowledged && res.matchedCount !== 0;

        if (order.status === ORDER_STATUS.RETURNED
            || order.status === ORDER_STATUS.CANCELLED) {
            return res;
        }

        for (const item of order.products) {
            await Game.updateOne({ _id: item.product._id }, { $inc: { quantityInStock: item.quantity } });
        }

        return res;
    } catch (err) {
        if (!err.status)
            err.status = 404;
        throw err;
    }
}

async function confirmOrder(orderId) {
    return await setOrderStatus(orderId, ORDER_STATUS.CONFIRMED);
}

async function sendOrder(orderId) {
    return await setOrderStatus(orderId, ORDER_STATUS.SENT);
}

async function fulfillOrder(orderId) {
    return await setOrderStatus(orderId, ORDER_STATUS.FULFILLED);
}

async function cancelOrder(orderId) {
    return await setOrderStatusAndReturnProducts(orderId, ORDER_STATUS.CANCELLED);
}

async function returnOrder(orderId) {
    return await setOrderStatusAndReturnProducts(orderId, ORDER_STATUS.RETURNED);
}

module.exports = {
    getUserOrders,
    getOrders,
    getOrderDetails,
    makeOrder,
    setOrderStatus,
    confirmOrder,
    sendOrder,
    fulfillOrder,
    cancelOrder,
    returnOrder
}
