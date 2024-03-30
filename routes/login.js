const express = require('express');
const loginRouter = express.Router();

const userService = require(`../sevices/user`);
const { checkPassword, issueJwt } = require('../utils/authorization');

loginRouter.get('/', (req, res) => {
    res.render('LoginPage');
});

async function authenticate(req, res, next) {
    const { email, password } = req.body;
    const user = await userService.findUsers(email);
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

function issueJwtMiddleware(req, res, next) {
    const { user } = req;
    const token = issueJwt({ userId: user.id, role: 'author' });
    req.token = token; 
    next(); 
}



loginRouter.post('/submit', authenticate, issueJwtMiddleware, (req, res) => {
    const { token } = req;
    res.json({ token });
});

module.exports = { loginRouter };
