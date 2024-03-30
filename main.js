const fs = require('fs');
const express = require('express')
const morgan = require('morgan')

const { loginRouter } = require('./routes/login');
const { signUpRouter } = require('./routes/signUp');
const srv = express()

srv.set('view engine', 'ejs')

const bodyParser = require('body-parser');

const jsonBodyParser = express.json()

srv.use(bodyParser.urlencoded({ extended: false }));
srv.use(jsonBodyParser)

srv.listen(3000, () => console.log('espress server is running [3000]'))
srv.use(morgan(':method :url :status '))

srv.get('/', (req, res) => {
    res.render('index')
})

srv.get('/signup', (req, res) => {
    res.render('SignUpPage')
})

srv.use('/login', loginRouter)
srv.use('/signup', signUpRouter)
  