import nodemailer from "nodemailer";

const hasEmailConfig = () => {
	return Boolean(
		process.env.SMTP_HOST &&
		process.env.SMTP_PORT &&
		process.env.SMTP_USER &&
		process.env.SMTP_PASS &&
		process.env.FROM_EMAIL
	);
};

const buildTransporter = () => {
	if (!hasEmailConfig()) {
		return null;
	}

	return nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: Number(process.env.SMTP_PORT),
		secure: process.env.SMTP_SECURE === "true",
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS,
		},
	});
};

const transporter = buildTransporter();

export default transporter;