const fs = require('fs');
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser');
const { loginRouter } = require('./routes/login');
const { signUpRouter } = require('./routes/signUp');
const srv = express()

const { articleService } = require(`./sevices/article`); // Винести !
const { createComment, getCommentsByArticleId } = require(`./sevices/comment`);
const { getAllArticles, getArticlesByUserId, getArticleById } = require('./sevices/article');
const { jwtParserMiddleware } = require('./middleware/auth');   // Винести !
srv.set('view engine', 'ejs')

const bodyParser = require('body-parser');

const jsonBodyParser = express.json()

srv.use(bodyParser.urlencoded({ extended: false }));
srv.use(jsonBodyParser)
srv.use(cookieParser());
srv.listen(3000, () => console.log('espress server is running [3000]'))
srv.use(morgan(':method :url :status '))

srv.get('/', async (req, res) => {
    try {
        const articles = await getAllArticles()

        res.render('index', {articles})
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }
})

srv.get('/signup', (req, res) => {
    res.render('SignUpPage')
})

srv.get('/my-posts', jwtParserMiddleware, async (req, res) => {
    const articles = await getArticlesByUserId(1)

    res.render('MyPostsPage', { articles })
})

srv.get('/post-page/:articleId', jwtParserMiddleware, async (req, res) => {
    const { articleId } = req.params; 
    const article = await getArticleById(articleId); 
    const comments = await getCommentsByArticleId(articleId)
    console.log(comments, article);
    res.render('PostPage', {  comments, article } );
});


srv.post('/create-post', jwtParserMiddleware, async (req, res) => {
    const postText = req.body.postText;
    const userId = req.userId; 

    try {
        const newPost = await articleService.Article.query().insert({
            text: postText,
            user_id: userId
        });
        res.send("Post received successfully");
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).send("Error creating post");
    }
});

srv.post('/create-comment', jwtParserMiddleware,  async (req, res) => {
    const commentText = req.body.commentText;
    const articleId = req.body.article_id; 
    try {
        const newComment = await createComment(commentText, articleId)
        res.redirect('/'); 
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).send("Error creating comment");
    }
});


srv.use('/login', loginRouter)
srv.use('/signup', signUpRouter)
  