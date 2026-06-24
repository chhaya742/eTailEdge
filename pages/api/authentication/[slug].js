// pages/api/authentication/[slug].js

import knex from '../../../database-config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

// ─── Constants ───────────────────────────────────────────────────────────────

const SALT_ROUNDS = 10;
const JWT_EXPIRY_LOGIN = '1h';
const JWT_EXPIRY_SIGNUP = '8h';
const RESET_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Generates a JWT token for a given user payload.
 */
function generateToken(payload, expiresIn = JWT_EXPIRY_LOGIN) {
    return jwt.sign({ user: payload }, process.env.JWT_SECRET, { expiresIn });
}

/**
 * Sends a password reset email to the specified address.
 */
async function sendResetEmail(email, token) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const resetLink = `${RESET_BASE_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Reset Your Password',
        html: `
      <p>You requested a password reset.</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
    });
}

/**
 * Sends a standardised JSON response.
 */
function send(res, status, ok, message, data = []) {
    return res.status(status).json({ status: ok, message, data });
}

// ─── Route Handlers ───────────────────────────────────────────────────────────

/**
 * POST /api/authentication/signup
 */
async function handleSignup(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return send(res, 400, false, 'name, email and password are required.');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    try {
        const [userId] = await knex('user').insert({ name, email, password: hashedPassword });
        const [user] = await knex('user').select('id', 'name', 'email').where({ id: userId });

        const token = generateToken(
            { id: user.id, email: user.email },
            JWT_EXPIRY_SIGNUP
        );

        await knex('user').update({ token }).where({ id: userId });

        return send(res, 201, true, 'Account created successfully.', { ...user, token });
    } catch (error) {
        // Duplicate email (MySQL error 1062)
        if (error.errno === 1062) {
            return send(res, 409, false, 'An account with this email already exists.');
        }
        console.error('[signup]', error);
        return send(res, 500, false, 'An unexpected error occurred. Please try again.');
    }
}

/**
 * POST /api/authentication/login
 */
async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return send(res, 400, false, 'Email and password are required.');
    }

    try {
        const [user] = await knex('user').select('*').where({ email });

        if (!user) {
            return send(res, 401, false, 'No account found with that email address.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return send(res, 401, false, 'Incorrect password.');
        }

        const token = generateToken({ id: user.id, email: user.email, password: user.password });

        // await knex('user').update({ token }).where({ id: user.id });

        const { password: _omit, ...safeUser } = user;
        return send(res, 200, true, "Login successful.", {...safeUser, token});
    } catch (error) {
        console.error('[login]', error);
        return send(res, 500, false, 'An unexpected error occurred. Please try again.');
    }
}

/**
 * POST /api/authentication/forgot-password
 * Checks if the email exists — does NOT reveal whether it does or doesn't
 * (avoids user enumeration). Always responds the same way.
 */
async function handleForgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
        return send(res, 400, false, 'Email is required.');
    }

    try {
        const [user] = await knex('user').select('id').where({ email });

        if (user) {
            // Trigger the actual email-sending step separately (reset-password slug)
            // Here we just confirm the email exists for your flow.
        }

        // Always return the same message to prevent user enumeration attacks.
        return send(res, 200, true, 'If that email is registered, a reset link has been sent.');
    } catch (error) {
        console.error('[forgot-password]', error);
        return send(res, 500, false, 'An unexpected error occurred. Please try again.');
    }
}

/**
 * POST /api/authentication/reset-password
 * Sends a password reset email containing the user's current JWT.
 */
async function handleResetPassword(req, res) {
    const { email } = req.body;

    if (!email) {
        return send(res, 400, false, 'Email is required.');
    }

    try {
        const [user] = await knex('user').select('email', 'token').where({ email });

        if (!user) {
            // Same generic message to prevent enumeration
            return send(res, 200, true, 'If that email is registered, a reset link has been sent.');
        }

        await sendResetEmail(user.email, user.token);
        return send(res, 200, true, 'A password reset link has been sent to your email address.');
    } catch (error) {
        console.error('[reset-password]', error);
        return send(res, 500, false, 'Something went wrong. Please try again.');
    }
}

/**
 * POST /api/authentication/update-password?token=<jwt>
 */
async function handleUpdatePassword(req, res) {
    const { password, confirmpassword } = req.body;
    const { token } = req.query;

    if (!token) {
        return send(res, 400, false, 'Reset token is missing.');
    }

    if (!password || !confirmpassword) {
        return send(res, 400, false, 'Password and confirmation are required.');
    }

    if (password !== confirmpassword) {
        return send(res, 400, false, 'Passwords do not match.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const updated = await knex('user').update({ password: hashedPassword }).where({ token });

        if (!updated) {
            return send(res, 400, false, 'Invalid or expired reset link. Please request a new one.');
        }

        const [user] = await knex('user').select('id', 'name', 'email').where({ token });
        const newToken = generateToken({ id: user.id, email: user.email });
        await knex('user').update({ token: newToken }).where({ id: user.id });

        return send(res, 200, true, 'Password updated successfully.', { ...user, token: newToken });
    } catch (error) {
        console.error('[update-password]', error);
        return send(res, 500, false, 'An unexpected error occurred. Please try again.');
    }
}

// ─── Route Map ────────────────────────────────────────────────────────────────

const HANDLERS = {
    'signup': handleSignup,
    'login': handleLogin,
    'forgot-password': handleForgotPassword,
    'reset-password': handleResetPassword,
    'update-password': handleUpdatePassword,
};

// ─── Main Handler ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
    const slug = req.query.slug;
    const route = HANDLERS[slug];

    if (!route) {
        return send(res, 404, false, `Unknown route: ${slug}`);
    }

    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return send(res, 405, false, 'Method not allowed. Use POST.');
    }

    return route(req, res);
}
