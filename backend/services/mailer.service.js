import transporter from "../config/mail.config.js";

export const sendEmailIfConfigured = async ({
	to,
	subject,
	html,
	text,
}) => {
	if (!transporter || !to) {
		return { sent: false };
	}

	try {
		await transporter.sendMail({
			from: process.env.FROM_EMAIL,
			to,
			subject,
			html,
			text,
		});

		return {
			sent: true,
		};
	} catch (error) {
		console.error("Email send failed:", error);

		return {
			sent: false,
		};
	}
};