const express = require('express');
const signUpRouter = express.Router();
const knexLib = require('knex');
const knexConfig = require('../knexfile');
const { hashPassword, issueJwt } = require('../utils/authorization');
const { userValidation } = require('../utils/validation');
const knex = knexLib(knexConfig);

signUpRouter.get('/', (req, res) => {
    res.render('SignUpPage');
});

signUpRouter.post('/register', userValidation, async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPass = await hashPassword(password)
        const user = { email, password: hashedPass }
        const result = await knex('users').insert(user)
        const id = result[0];
        const savedUser = { id: id, ...user };
        const token = issueJwt({ userId: id, role: 'author' });
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/'); 

    } catch (err) {
        res.send(400, err.message)
        return
    }
});

module.exports = { signUpRouter };