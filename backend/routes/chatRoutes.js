import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Chat from "../models/Chat.model.js";

const router = Router();

router.post('/send',authMiddleware, async (req,res) => {
    try {
        const {senderId , receiverId, message} = req.body;
        const newMessage = new Chat({senderId , receiverId , message});
        await newMessage.save();
        res.status(200).json({message : 'Message sent successfully' , newMessage });
    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Error while sending message'});
    }
    
});

export default router;