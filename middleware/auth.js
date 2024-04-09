const { issueJwt, verifyJwt } = require('../utils/authorization');

const issueJwtMiddleware = (req, res, next) => {
    const { user } = req;
    const token = issueJwt({ userId: user.id, role: 'author' });
    req.token = token;
    next(); 
};

function jwtParserMiddleware(req, resp, next) {
    const token = req.cookies.jwt;
    const payload = verifyJwt(token);

    req._auth = payload;

    if (Object.keys(payload).length === 0) {
        resp.clearCookie('jwt');
        return resp.redirect('/login');
    }

    const userId = payload.userId;

    req.userId = userId;

    next();
}


module.exports = {
    issueJwtMiddleware,
    jwtParserMiddleware
};