import axios from "axios";
import dotenv from 'dotenv'
dotenv.config();

export const sendOtpViaFast2SMS = async (mobile, otp) => {
  const response = await axios.post("https://www.fast2sms.com/dev/bulkV2", {
    route: 'q',
    message: `Your AgriLink OTP is ${otp}`,
    language: "english",
    flash: 0,
    numbers: mobile,
  }, {
    headers: {
      authorization: process.env.FAST2SMS_API_KEY,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};