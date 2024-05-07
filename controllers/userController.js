const User = require('../models/User');
const bcrypt = require('bcrypt');
const { json } = require('express');
const jwt = require('jsonwebtoken');

const jwtSecrect = process.env.JWT_SECRET;


//Metodo POST
exports.register = async(req, res) =>{
    try {
        const {username, password} = req.body;
        console.log("user", username, "pass", password);

        const userExists = await User.findOne({username : username});

        if(userExists) {
            return res.status(400).json({message: 'Username already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        await User.create(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username: username })

        if (!user) {
            res.status(400).json({ message: 'Invalid username or password' });
        }

        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username }, jwtSecrect);
            return res.json({ token });
        }else{
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.logout = async (req, res)=>{
    res.json({ message: 'Logged out successfully' });
}