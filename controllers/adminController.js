require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const jwtSecret = process.env.jwtSecret;
const ADMIN = 'admin';

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const userExists = await User.findOne({ username: username });

        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword, role:ADMIN };
        await User.create(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                username: user.username,
                _id: user.id,
                role: user.role,
                exp: Math.floor(Date.now() / 1000) + (30 * 60),
            }, jwtSecret);
            return res.json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}