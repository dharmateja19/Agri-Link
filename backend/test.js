/**
 * test.js
 * Standalone SMTP connection + send test.
 *
 * Usage:
 *   npm install nodemailer
 *   SMTP_USER=you@gmail.com SMTP_PASS=yourapppassword TEST_TO=you@example.com node test.js
 *
 * Or set the values directly below for a quick local test.
 */

import nodemailer from "nodemailer";

// ---- Config (env vars preferred, fallback to hardcoded for quick testing) ----
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER || 'subscriptiontrackertest@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || 'huphhvkqjskenuhe';
const TEST_TO   = process.env.TEST_TO   || "suribrother99@gmail.com";

async function main() {
  console.log('--- SMTP Test Start ---');
  console.log(`Host: ${SMTP_HOST}`);
  console.log(`Port: ${SMTP_PORT}`);
  console.log(`User: ${SMTP_USER}`);
  console.log(`Sending to: ${TEST_TO}`);
  console.log('Forcing IPv4 (family: 4) to avoid ENETUNREACH on IPv6-broken hosts...\n');

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465, false for 587 (STARTTLS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    family: 4, // <-- key fix: force IPv4 resolution
    connectionTimeout: 10000, // fail fast (10s) instead of hanging
  });

  // Step 1: verify connection/auth
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully.\n');
  } catch (err) {
    console.error('❌ SMTP verify() failed:');
    console.error(err);
    process.exit(1);
  }

  // Step 2: send a real test email
  try {
    const info = await transporter.sendMail({
      from: SMTP_USER,
      to: TEST_TO,
      subject: 'SMTP Test Email',
      text: 'If you are reading this, your SMTP config works correctly.',
      html: '<p>If you are reading this, your <b>SMTP config works correctly</b>.</p>',
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    if (nodemailer.getTestMessageUrl(info)) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  } catch (err) {
    console.error('❌ sendMail() failed:');
    console.error(err);
    process.exit(1);
  }

  console.log('--- SMTP Test End ---');
}

main();