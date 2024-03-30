const { Model } = require('objection');
const { knex } = require('../db');

Model.knex(knex);

class Article extends Model {
    static get tableName() {
        return 'articles'; 
    }

    static get relationMappings() {
        const Users = require('./Users'); 

        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'articles.author_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Article;
