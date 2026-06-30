import crypto from "crypto";

const OTP_EXPIRY_MINUTES = 5;
const OTP_RESEND_COOLDOWN_SECONDS = 60;
const MAX_OTP_ATTEMPTS = 5;

// Generate a random 6-digit OTP
export const generateOTP = () => {
    return crypto.randomInt(100000, 1000000).toString();
};

// Hash OTP using SHA-256
export const hashOTP = (otp) => {
    return crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
};

// Compare plain OTP with hashed OTP
export const compareOTP = (otp, hashedOTP) => {
    return hashOTP(otp) === hashedOTP;
};

// Generate OTP expiry time
export const getOTPExpiry = () => {
    return new Date(
        Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000
    );
};

// Check if OTP has expired
export const isOTPExpired = (expiryTime) => {
    return new Date() > expiryTime;
};

// Check resend cooldown
export const canResendOTP = (lastOTPSentAt) => {
    if (!lastOTPSentAt) return true;

    const cooldown =
        OTP_RESEND_COOLDOWN_SECONDS * 1000;

    return (
        Date.now() - lastOTPSentAt.getTime() >= cooldown
    );
};

// Check maximum verification attempts
export const hasExceededMaxAttempts = (attempts) => {
    return attempts >= MAX_OTP_ATTEMPTS;
};