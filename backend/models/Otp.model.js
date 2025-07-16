import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
  otp: { type: String, required: true },
  lastSentAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

const Otp = new mongoose.model("Otp", otpSchema);
export default Otp;
