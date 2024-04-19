const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("user", username, "pass", password)

        const userExists = await User.findOne({ username: username });

        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        await User.create(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username, _id: user._id, }, jwtSecret);
            return res.json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.userAttractions = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('attractions');

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        return res.json({ user, userAttractions: user.attractions });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    res.json({ message: 'Logged out successfully' });
    //este codigo no hace nada el logout se debe hacer del lado del cliente
    //Tarea pendiente agregar expiracion al jwt token generado
};
