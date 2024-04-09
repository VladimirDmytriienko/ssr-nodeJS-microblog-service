const { Model } = require('objection');
const { knex } = require('../db');

Model.knex(knex);

class Article extends Model {
    static get tableName() {
        return 'articles';
    }

    static get relationMappings() {
        const User = require('./user');
        const Comment = require('./comment');
        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'articles.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}


async function getAllArticles() {
    try {
        const articles = await Article.query()
        return articles;
    } catch (error) {
        console.error('Error during fetching articles:', error);
        throw error;
    }
}
async function getArticlesByUserId(userId) {
    try {
        const articles = await Article.query()
            .where('user_id', userId);
        return articles;
    } catch (error) {
        console.error('Error during fetching articles by user id:', error);
        throw error;
    }
}

async function getArticleById(articleId) {
    try {
        const article = await Article.query().findById(articleId);
        return article;
    } catch (error) {
        console.error('Error fetching article by ID:', error);
        throw error;
    }
}


module.exports = {
    Article,
    getAllArticles,
    getArticlesByUserId,
    getArticleById
};

