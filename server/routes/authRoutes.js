// routes/authRoutes.js
import express from 'express';
import { register, login, getProfile,updateProfile,forgotPassword,resetPassword  } from '../controllers/authController.js';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import path from 'path';

const router = express.Router();

// Serve static files from the "uploads" folder
router.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Route for user registration
router.post('/register', upload.single('profilePicture'), register); 

// Route for user login
router.post('/login',login);

// Route to get user profile by id for updating ; protected route
router.get('/profile/:id',protect, getProfile);

// Route to get user profile : Pkrotected route,
router.get('/profile',protect,getProfile);

// Route to update user profile: protected route
router.put('/profile/:id',protect, upload.single('profilePicture'),updateProfile);

//Route to forgot password of the user
router.post('/forgot-password', forgotPassword);

//Route for reset password of the user..
router.post('/reset-password/:id/:token', resetPassword);

export default router;
