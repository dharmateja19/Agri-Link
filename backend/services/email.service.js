import transporter from "../config/mail.config.js";

export const sendVerificationOTP = async (email, otp) => {
    const mailOptions = {
        from: `"AgriLink" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your AgriLink Account",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px;">
                
                <h2 style="color: #2E7D32; text-align: center;">
                    Welcome to AgriLink 🌱
                </h2>

                <p>Hello,</p>

                <p>
                    Thank you for registering with <strong>AgriLink</strong>.
                    Please use the verification code below to verify your email address.
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <h1 style="letter-spacing: 8px; color: #2E7D32;">
                        ${otp}
                    </h1>
                </div>

                <p>
                    This OTP is valid for <strong>5 minutes</strong>.
                </p>

                <p>
                    If you did not create this account, you can safely ignore this email.
                </p>

                <hr>

                <p style="font-size: 12px; color: gray;">
                    This is an automated email from AgriLink. Please do not reply.
                </p>

            </div>
        `,
    };

    return await transporter.sendMail(mailOptions);
};