const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const { loginRouter } = require('./routes/login');
const { signUpRouter } = require('./routes/signUp');
const articlesRouter = require('./routes/articles')

const srv = express()

srv.set('view engine', 'ejs')

const jsonBodyParser = express.json()

srv.use(bodyParser.urlencoded({ extended: false }));
srv.use(jsonBodyParser)
srv.use(cookieParser());
srv.use(morgan(':method :url :status '))

srv.use('/', articlesRouter)
srv.use('/login', loginRouter)
srv.use('/signup', signUpRouter)

srv.listen(3000, () => console.log('express server is running [3000]'))