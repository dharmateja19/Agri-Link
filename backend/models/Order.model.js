import mongoose from "mongoose";

const orderSchema  = new mongoose.Schema({
    crop : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Crop',
        required : true
    },
    buyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    farmer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['pending','confirmed','shipped','delivered','cancelled'],
        required : true,
        default : 'pending'
    }
},{timestamps : true});

const Order = new mongoose.model('Order',orderSchema);
export default Order;