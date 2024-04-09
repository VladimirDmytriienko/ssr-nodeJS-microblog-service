const { Model } = require('objection');
const { knex } = require('../db');

Model.knex(knex);

class Comment extends Model {
    static get tableName() {
        return 'comments';
    }
}

module.exports = {
    Comment, 
    async createComment(text, articleId) {
        try {
            const comment = await Comment.query().insert({
                text: text,
                article_id: articleId,
            });
            return comment;
        } catch (error) {
            throw new Error('Error creating comment', error);
        }
    },

    async getCommentsByArticleId(articleId) {
        try {
            const comments = await Comment.query().where('article_id', articleId);
            return comments;
        } catch (error) {
            throw new Error('Error fetching comments');
        }
    },

    async updateComment(commentId, newText) {
        try {
            const updatedComment = await Comment.query().patchAndFetchById(commentId, { text: newText });
            return updatedComment;
        } catch (error) {
            throw new Error('Error updating comment');
        }
    },

    async deleteComment(commentId) {
        try {
            await Comment.query().deleteById(commentId);
        } catch (error) {
            throw new Error('Error deleting comment');
        }
    }
};
