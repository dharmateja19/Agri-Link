import bcrypt from "bcryptjs";
import Otp from "../models/Otp.model.js";
import { sendOtpViaFast2SMS } from "../utils/sendOtp.js";

export const sendOtp = async (req, res) => {
  const { mobile } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  const existingOtp = await Otp.findOne({ mobile });
  const now = new Date();

  if (existingOtp && now - existingOtp.lastSentAt < 30000) {
    return res.status(429).json({ error: "Please wait 30 seconds before resending OTP." });
  }

  await Otp.deleteMany({ mobile });

  const otpEntry = new Otp({
    mobile,
    otp: hashedOtp,
    lastSentAt: now,
  });

  await otpEntry.save();

  try {
    await sendOtpViaFast2SMS(mobile, otp);
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Fast2SMS error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to send OTP." });
  }
};

export const verifyOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  const record = await Otp.findOne({ mobile });
  if (!record) return res.status(400).json({ error: "OTP expired or not found." });

  const match = await bcrypt.compare(otp, record.otp);
  if (!match) return res.status(400).json({ error: "Invalid OTP." });

  await Otp.deleteMany({ mobile });
  res.status(200).json({ success: true, message: "OTP verified successfully." });
};
