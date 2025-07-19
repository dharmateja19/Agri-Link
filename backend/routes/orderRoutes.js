import { Router } from "express";
import authMiddleware, { authorize } from "../middleware/authMiddleware.js";
import Order from "../models/Order.model.js";
import Crop from "../models/Crop.model.js";

const router = Router();

router.get('/',authMiddleware ,authorize(['admin']), async (req,res) => {
    try {
        const orders = await Order.find().populate('crop','name price imageUrl').populate('farmer','name location').populate('buyer', 'name');
        res.status(200).json({message: "Orders found successfully", orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while finding orders"});
    }
});

router.post('/addorder',authMiddleware, authorize(['buyer']), async (req,res) => {
    try {
        const {cropId , quantity} = req.body;
        const buyerId = req.user.id;
        const crop = await Crop.findById(cropId).populate('farmer');

        if(!crop) return res.status(404).json({message: 'Invalid crop'});
        if(quantity > crop.quantity) return res.status(400).json({message: 'Quantity exceeded'});
        crop.quantity -= quantity;
        await crop.save();
        const totalPrice = crop.price * quantity;
        const newOrder = new Order({
            crop : cropId,
            buyer : buyerId,
            farmer : crop.farmer._id,
            quantity,
            totalPrice
        });
        
        await newOrder.save();
        res.status(201).json({message : "Order placed successfully", newOrder});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while placing order"});
    }
});

router.put('/updateorder/:id', authMiddleware ,authorize(['farmer']), async (req,res) => {
    try {
        const {status} = req.body;
        const orderId = req.params.id;

        const order = await Order.findById(orderId);
        if(!order) return res.status(404).json({message: "Order not found"});

        if (order.farmer.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized to update this order" });

        const crop = await Crop.findById(order.crop);
        if (!crop) return res.status(404).json({ message: "Crop not found" });

        const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const allowedTransitions = {
            pending: ['confirmed', 'cancelled'],
            confirmed: ['shipped', 'cancelled'],
            shipped: ['delivered'],
            delivered: [],
            cancelled: []
        };
        const currentStatus = order.status;

        if (!allowedTransitions[currentStatus].includes(status)) {
            return res.status(400).json({
                message: `Cannot change status from ${currentStatus} to ${status}`
            });
        }
        order.status = status;

        if(status === 'cancelled'){
            crop.quantity += order.quantity;
            await crop.save();
        }
        
        await order.save();
        res.status(200).json({message: "order updated successfully",order});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while updating order"});
    }
});

router.delete('/deleteorder/:id', authMiddleware ,authorize(['buyer']), async (req,res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if(!order) return res.status(404).json({message: "Order not found"});

        if (order.buyer.toString() !== req.user.id)
            return res.status(403).json({ message: "Not authorized to delete this order" });

        await order.deleteOne();
        res.status(200).json({message: "order deleted successfully"}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while deleting order"});
    }
})

router.get('/farmer', authMiddleware ,authorize(['farmer']),async (req,res) => {
    try {
        const farmerId = req.user.id;
        const orders = await Order.find({farmer: farmerId}).populate('crop', 'name price imageUrl').populate('farmer', 'name').populate('buyer','name mobile location');
        res.status(200).json({message : "Orders found successfully" , orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while finding orders"});
    }
});

router.get('/buyer',authMiddleware , authorize(['buyer']),async (req,res) => {
    try {
        const buyerId = req.user.id;
        const orders = await Order.find({buyer: buyerId}).populate('crop','name price imageUrl').populate('buyer','name').populate('farmer', 'name location');
        res.status(200).json({message : "Orders found successfully" , orders});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error while finding orders"});
    }
})

export default router;