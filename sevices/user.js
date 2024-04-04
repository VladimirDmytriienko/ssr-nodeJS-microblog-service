const { Model } = require('objection');
const { knex } = require('../db');

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        const Article = require('./article');

        return {
            articles: {
                relation: Model.HasManyRelation,
                modelClass: Article,
                join: {
                    from: 'users.id',
                    to: 'articles.user_id'
                }
            }
        };
    }
}

function findUser(login) {
    return User.query().findOne({ email: login });
}

module.exports = {
    User,
    findUser
};

