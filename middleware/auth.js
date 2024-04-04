const {  issueJwt } = require('../utils/authorization');

const issueJwtMiddleware = (req, res, next) => {
    const { user } = req;
    const token = issueJwt({ userId: user.id, role: 'author' });
    req.token = token;
    next(); 
};

module.exports = { issueJwtMiddleware };