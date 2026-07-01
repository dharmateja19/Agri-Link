import { sendEmailIfConfigured } from "./mailer.service.js";

import { verificationTemplate } from "../templates/emails/verification.template.js";
import { passwordResetTemplate } from "../templates/emails/passwordReset.template.js";

export const sendVerificationOTP = async (email, otp) => {
	return await sendEmailIfConfigured({
		to: email,
		subject: "Verify Your AgriLink Account",
		html: verificationTemplate(otp),
	});
};

export const sendPasswordResetOTP = async (email, otp) => {
	return await sendEmailIfConfigured({
		to: email,
		subject: "Reset Your AgriLink Password",
		html: passwordResetTemplate(otp),
	});
};