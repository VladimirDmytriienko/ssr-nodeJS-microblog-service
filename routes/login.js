const express = require('express');
const loginRouter = express.Router();
const userService = require(`../sevices/user`);
const { checkPassword, issueJwt } = require('../utils/authorization');
const { userValidation } = require('../utils/validation');
const { issueJwtMiddleware } = require('../middleware/auth');

loginRouter.get('/', (req, res) => {
    res.render('LoginPage');
});

async function authenticate(req, res, next) {
    const { email, password } = req.body;
    const user = await userService.findUser(email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const checkedPass = await checkPassword(password, user.password);
    if (!checkedPass) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    req.user = user;
    next();
}

loginRouter.post('/submit', userValidation, authenticate, issueJwtMiddleware, (req, res) => {
    const { token } = req;
    res.cookie('jwt', token, { httpOnly: true });
    res.redirect('/'); 
});

module.exports = { loginRouter }; 