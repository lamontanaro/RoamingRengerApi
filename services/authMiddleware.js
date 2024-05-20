require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret;
const ADMIN = 'admin';

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Access token is missing'});
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Invalid Token'});
        }
        req.user = user;
        next();
    })
}

exports.authenticateAdminToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: 'Access token is missing'});
    }
    jwt.verify(token, jwtSecret, (err, user) => {
        if (user.role === ADMIN) {
            req.user = user;
            next();
        }
        else {
            return res.status(500).json({message: 'Unauthorized'});
    }
    })
}