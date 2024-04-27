const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwtSecret;

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Access token is missing'});
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Invalid Token'});
        }
        req.user = user;
        next();
    })
}