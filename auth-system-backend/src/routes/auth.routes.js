/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - emailAddress
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               emailAddress:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify email using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 example: "bf9e659e7e0cce1f26b20bdd392b6d7ce77574efb32bd5a02bb00afe76530335"
 *     responses:
 *       201:
 *         description: Email verified successfully. User can now log in.
 *       400:
 *         description: Missing or invalid token
 *       404:
 *         description: Token expired
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailAddress
 *               - password
 *             properties:
 *               emailAddress:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: StrongPass123!
 *     responses:
 *       200:
 *         description: Login successful (cookie set)
 *       404:
 *         description: Invalid credentials or unverified email
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out
 */

/**
 * @swagger
 * /forgot:
 *   post:
 *     summary: Request password reset
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Reset code sent
 */

/**
 * @swagger
 * /verify-reset-code:
 *   post:
 *     summary: Verify reset code
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Code verified
 */

/**
 * @swagger
 * /reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Password reset successful
 */

/**
 * @swagger
 * /change-password:
 *   post:
 *     summary: Change password (authenticated)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Password changed
 */

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info
 */

import express from "express";
import { auth } from "../auth/auth.js";
import {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  forgotPassword,
  verifyResetCode,
  resetPassword,
  changePassword,
  checkAuthToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyEmail);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot", forgotPassword);
router.post("/verify-reset-code", verifyResetCode);
router.post("/reset-password", resetPassword);
router.post("/change-password", auth, changePassword);
router.get("/me", checkAuthToken);

export default router;
