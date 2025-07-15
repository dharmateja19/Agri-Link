import { Router } from "express";
import User from "../models/User.model.js";
import authMiddleware, { authorize } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/",authMiddleware, authorize(['admin']), async (req,res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({message : "Users found successfully",users});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error while fetching users"});
    }
});

router.get("/:id",authMiddleware, async (req,res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({_id : userId}).select('-password');
        if(!user) return res.status(404).json({message: "user not found"});
        res.status(200).json({message: "User found successfully" , user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "error while fetching user"});
    }
});

export default router;