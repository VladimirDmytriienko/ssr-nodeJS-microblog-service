const { Model } = require('objection');
const { knex } = require('../db');

Model.knex(knex);

class Article extends Model {
    static get tableName() {
        return 'articles';
    }

    static get relationMappings() {
        const User = require('./user');

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
        const articles = await Article.query().withGraphFetched('author');
        return articles;
    } catch (error) {
        console.error('Error during fetching articles:', error);
        throw error;
    }
}
module.exports = {
    Article,
    getAllArticles
};

