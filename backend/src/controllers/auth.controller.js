import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {createToken} from '../libs/jwt.js';
import {TOKEN_SECRET} from '../config.js';

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["The email is already in use"]);

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({ 
            username, 
            email, 
            password: passwordHash
        });
        
        const userSaved = await newUser.save();

        const token = await createToken({id: userSaved._id});

        res.cookie('token', token,{SameSite: 'None', secure: true, httpOnly: true});
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        });
    

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json({
            message: ["The email does not exist"],
          });

        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({
            message: ["The password is incorrect"],
          });
        
        const token = await createToken({
            id: userFound._id,
            username: userFound.username,
        });
        res.cookie('token', token,{SameSite: 'None', secure: true, httpOnly: true});
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const logout = async (req, res) => {
    res.cookie('token', '',{expires: new Date(0)});
    return res.status(200);
}

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({message: 'User not found'});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if (!token) return res.status(401).json({message: 'Access denied'});
    
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({message: 'Invalid token'});
        
        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(400).json({message: 'Unauthorized'});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
}