import transporter from "../config/mail.config.js";

export const sendEmail = async ({ to, subject, html }) => {
    return await transporter.sendMail({
        from: `"AgriLink" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};