const fs = require('fs');
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const { loginRouter } = require('./routes/login');
const { signUpRouter } = require('./routes/signUp');
const srv = express()

const articleService = require(`./sevices/article`); // Винести !
const { jwtParserMiddleware } = require('./middleware/auth');                                                     // Винести !
srv.set('view engine', 'ejs')

const bodyParser = require('body-parser');

const jsonBodyParser = express.json()

srv.use(bodyParser.urlencoded({ extended: false }));
srv.use(jsonBodyParser)
srv.use(cookieParser());
srv.listen(3000, () => console.log('espress server is running [3000]'))
srv.use(morgan(':method :url :status '))

srv.get('/', (req, res) => {
    res.render('index')
})

srv.get('/signup', (req, res) => {
    res.render('SignUpPage')
})

srv.post('/create-post', jwtParserMiddleware, async (req, res) => {
    const postText = req.body.postText;
    const userId = req.userId; 

    try {
        const newPost = await articleService.Article.query().insert({
            text: postText,
            user_id: userId
        });
        console.log("New post created:", postText);

        res.send("Post received successfully");
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    }
});

srv.use('/login', loginRouter)
srv.use('/signup', signUpRouter)
  