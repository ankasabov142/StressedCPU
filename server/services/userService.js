const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { User } = require('../models');
const validate = require('../util/validators');
const { trimObjectValues } = require('../util/functions');
const { emailRegExp, passwordRegExp } = require('../util/patterns');
const { invalidSession } = require('../util/errorMessages');

function generateJwt(user) {
    const token = jwt.sign({
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    }, process.env.JWT_SECRET, { expiresIn: '2d' })

    return token;
}


async function login({
    email,
    password
}) {
    try {
        const user = await User.findOne({ email }).populate(favouritesPopulateObj());
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new Error();
        }

        return getUserReturnInfo(user.toObject());
    } catch (err) {
        err.message = 'Incorrect email or password';
        err.status = 401;
        throw err;
    }
}

async function loginByToken(token) {
    try {
        if (!token)
            throw new Error();

        const jwtUser = jwt.verify(token, process.env.JWT_SECRET);

        if (!jwtUser)
            throw new Error();

        return getUserReturnInfo(
            await User.findById(jwtUser._id).populate(favouritesPopulateObj()).lean()
        );
    } catch (err) {
        err.message = invalidSession();
        err.status = 401;
        throw err;
    }
}

async function register({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    repassword
}) {
    if (password?.trim() !== repassword?.trim()) {
        throw new Error('Passwords do not match');
    }

    const obj = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    }

    validateUserInfo(obj);

    try {
        const hash = await bcrypt.hash(obj.password, 10)
        obj.password = hash

        return getUserReturnInfo(
            (await User.create(obj)).toObject()
        );
    } catch (err) {
        err.status = 401;
        throw err;
    }
}

async function editUser(id, {
    firstName,
    lastName,
    email,
    phoneNumber,
    password
}) {
    const obj = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    }

    validateUserInfo(obj);

    try {
        let user = await User.findById(id).populate(favouritesPopulateObj());
        const match = await bcrypt.compare(obj.password, user.password);

        if (!match) {
            throw new Error();
        }

        delete obj.password;

        await user.updateOne(obj);

        Object.assign(user, obj);

        return getUserReturnInfo(user.toObject());
    } catch (err) {
        err.message = 'Incorrect password';
        err.status = 401;
        throw err;
    }
}

async function getIsUserAdmin(userId) {
    return await User.findById(userId)?.isAdmin;
}

async function addFavourite({ gameId, userId }) {
    try {
        const user = await User.findById(userId);

        if (user.favourites.includes(gameId)) {
            const err = new Error('Game is already added to favourites');
            err.status = 409;
            throw err;
        }

        user.favourites.push(gameId);

        return (await (await user.save())
            .populate(favouritesPopulateObj()))
            .favourites;

    } catch (err) {
        err.customCaller = "Game";
        if (!err.status)
            err.status = 404;
        throw err;
    }
}

async function removeFavourite({ gameId, userId }) {
    try {
        await User.updateOne({ _id: userId }, { $pull: { favourites: gameId } });

        return (await User.findById(userId)
            .populate(favouritesPopulateObj())
            .select('favourites'))
            .favourites;

    } catch (err) {
        err.customCaller = "Game";
        err.status = 404;
        throw err;
    }
}

function getUserReturnInfo(user) {
    delete user.password;

    user.accessToken = generateJwt(user);

    return user;
}

function validateUserInfo(user) {
    trimObjectValues(user);

    validate.required(user.firstName, { name: 'First namе' });
    validate.maxLength(user.firstName, 50, { name: 'First namе' });

    validate.required(user.lastName, { name: 'Last name' });
    validate.maxLength(user.lastName, 50, { name: 'Last name' });

    validate.required(user.email, { name: 'Email' });
    validate.match(user.email, emailRegExp, { name: 'Email' });
    validate.maxLength(user.email, 320, { name: 'Email' });

    validate.maxLength(user.phoneNumber, 15, { name: 'Phone number' });

    validate.required(user.password, { name: 'Password' });
    validate.minLength(user.password, 8, { name: 'Password' });
    validate.match(user.password, passwordRegExp, {
        name: 'Password',
        msgPattern: () => 'Password must contain at least 1 of each: small and capital letters, digits, special characters'
    });
    validate.maxLength(user.password, 250, { name: 'Password' });
}

function favouritesPopulateObj() {
    return {
        path: 'favourites',
        populate: 'categories genres tags',
        select: '-description -media -__v'
    }
}

module.exports = {
    register,
    login,
    loginByToken,
    editUser,
    getIsUserAdmin,
    addFavourite,
    removeFavourite
}