const jwt = require('jsonwebtoken');
const jwsauthtoken = "SHIVAMGUPTA";

const middle = (req, res, next) => {
    const token = req.header('authtoken');

    if (!token) {
        res.status(400).json({ message: 'Invalid tokens' })
    }
    try {
        const data = jwt.verify(token, jwsauthtoken);
        req.user = data;
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = middle;