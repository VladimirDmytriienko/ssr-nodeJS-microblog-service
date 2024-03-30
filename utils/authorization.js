const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function hashPassword(plainTextPass) {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(plainTextPass, salt)
    return hashedPass
}

async function checkPassword(plainTextPass, hashedPass) {
    try {
        return !!(await bcrypt.compare(plainTextPass, hashedPass))
    } catch (error) {
        return false
    }
}

const secret = 'my secret JWT string'

function issueJwt(dataTosignIn) {
    return jwt.sign(dataTosignIn, secret, {expiresIn: '4h'})
}

function verifyJwt(token) {
    let data = {};
    if (!token) {
        console.log('Missing JWT, unauth client');
        return data;
    }

    try {
        data = jwt.verify(token, secret);
    } catch (err) {
        console.error('Invalid JWT!');

    }

    return data;
}

module.exports = {
    hashPassword, 
    checkPassword,
    issueJwt,
    verifyJwt
}