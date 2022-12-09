const { ShoppingCart, ShoppingCartProduct, Game } = require("../models")
const shoppingCartProductSchema = require("../models/schemas/shoppingCartProductSchema");

const EMPTY_CART = { empty: true };

function getPopulateObj() {
    return {
        path: 'products.product',
        populate: 'categories genres tags',
        select: '-description -media -__v'
    };
}

async function getUserCart(userId, { wholeDocument = false } = {}) {
    try {
        let cart;

        if (wholeDocument) {
            cart = await ShoppingCart.findOne({ userId });
        } else {
            cart = (await ShoppingCart.findOne({ userId }).populate(getPopulateObj())).products;
        }

        if (!cart) {
            throw new Error();
        }

        return cart;
    } catch (err) {
        return EMPTY_CART;
    }
}

async function initUserCart({ userId, products }) {
    try {
        return await ShoppingCart.create({ userId, products });
    } catch (err) {
        err.status = 404;
        throw err;
    }
}

async function addProduct(userId, { gameId, quantity = 1 }) {  // current quantity of product in cart
    const gameExists = await Game.exists({ _id: gameId });
    if (!gameExists) {
        const err = new Error();
        err.customCaller = 'Game';
        err.status = 404;
        throw err;
    }

    const cart = await getUserCart(userId, { wholeDocument: true });

    quantity = Math.max(1, quantity);

    const product = { product: gameId, quantity };

    if (cart.empty) {
        return await initUserCart({ userId, products: [product] })
    }

    const existingProductIndex = cart.products.findIndex(p => p.product._id.equals(gameId));

    if (existingProductIndex === -1) {
        cart.products.push(product);
    } else {
        cart.products[existingProductIndex].quantity = quantity;
    }

    return (await (await cart.save()).populate(getPopulateObj())).products;
}

async function removeProduct(userId, { gameId, quantity = 0 }) { // current quantity of product in cart 
    const cart = await getUserCart(userId, { wholeDocument: true });

    if (cart.empty) {
        return cart;
    }

    const productIndex = cart.products.findIndex(p => p.product._id.equals(gameId));

    if (productIndex === -1) {
        return cart;
    }

    if (quantity <= 0) {
        if (cart.products.length === 1) {
            return await emptyCart(userId);
        }

        cart.products.splice(productIndex, 1);

    } else {
        cart.products[productIndex].quantity = quantity;
    }

    return (await (await cart.save()).populate(getPopulateObj())).products;
}

async function emptyCart(userId) {
    const res = await ShoppingCart.deleteOne({ userId });

    if (res.acknowledged) {
        return EMPTY_CART;
    }

    return res;
}

async function orderFromCart(userId) {
    const cart = await getUserCart(userId, { wholeDocument: true })
}


module.exports = {
    getUserCart,
    addProduct,
    removeProduct,
    emptyCart
}