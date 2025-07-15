import {Router} from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req,res) => {
    const {name, email , password, mobile , role, location} = req.body;
    try {
        const exists = await User.findOne({email});
        if(exists) {
            return res.status(400).json({message : "User already exists please login"});
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const user = new User({name, email,password:hashedpassword,mobile , role, location});
        await user.save();
        res.status(201).json({message: "User Registered succesfully",user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Error while Registering"});
    }
});

router.post("/login" , async (req,res) => {
    const {email , password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message : "User not found. Try Registering..."});
        }

        if(!await bcrypt.compare(password,user.password)){
            return res.status(400).json({message : "Invalid password."});
        }

        const token = jwt.sign({id:user._id, email:user.email, role:user.role} , JWT_SECRET, {
            expiresIn : '1d'
        });

        res.status(200).json({message: "User Login succesfully.", token ,user});
    } catch (error) {
        res.status(500).json({message : "Error while Login."});
    }
});

router.post("/logout", (req,res) => {
    res.status(200).json({message: "Logout Successful"});
})

export default router;