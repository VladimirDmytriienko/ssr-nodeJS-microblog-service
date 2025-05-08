const express = require('express');
const router = express.Router();
const { jwtParserMiddleware } = require('../middleware/auth');
const { getAllArticles, getArticlesByUserId, getArticleById } = require('../sevices/article');
const { createComment, getCommentsByArticleId } = require('../sevices/comment');
const { Article } = require('../sevices/article');

router.get('/', async (req, res) => {
  try {
    const articles = await getAllArticles()
    res.render('index', { articles })
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).send('Internal Server Error');
  }
})

router.get('/my-posts', jwtParserMiddleware, async (req, res) => {
  const articles = await getArticlesByUserId(req.userId)
  res.render('MyPostsPage', { articles })
})

router.get('/post-page/:articleId', jwtParserMiddleware, async (req, res) => {
  const { articleId } = req.params;
  const article = await getArticleById(articleId);
  const comments = await getCommentsByArticleId(articleId)
  res.render('PostPage', { comments, article });
});

router.post('/create-post', jwtParserMiddleware, async (req, res) => {
  const postText = req.body.postText;
  const userId = req.userId;

  try {
    const newPost = await Article.query().insert({
      text: postText,
      user_id: userId
    });
    res.send("Post received successfully");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Error creating post");
  }
});

router.post('/create-comment', jwtParserMiddleware, async (req, res) => {
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

module.exports = router; 