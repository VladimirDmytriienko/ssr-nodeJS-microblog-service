const { Model } = require('objection');
const { knex } = require('../db');

Model.knex(knex);

class Users extends Model {
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
                    to: 'articles.author_id'
                }
            }
        };
    }
}

function findUsers(login) {
    return Users.query().findOne({ email: login });
}

module.exports = {
    Users,
    findUsers
};
