const express = require('express');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();
const sendEmail = require('../utils/sendEmail');

// User registration route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, email, password });
    await user.save();

    // Send a welcome email
    await sendEmail(email, 'Welcome to Our App', `Hi ${username}, welcome to our app!`);

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error); // Log error details to the console
    res.status(500).json({ msg: 'Server error', error: error.message }); // Include error message in response
  }
});


// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Forgot password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const resetToken = new PasswordResetToken({ userId: user._id, token });
    await resetToken.save();

    const resetUrl = `http://localhost:5173/reset-password/${token}`;
    
    // Send password reset email
    await sendEmail(email, 'Password Reset Request', `Click the following link to reset your password: ${resetUrl}`);

    // Alert message after sending mail
    res.json({ msg: 'Password reset link sent!' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});
  
// Reset password route
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the reset token in the database
    const resetToken = await PasswordResetToken.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    user.password = password;

    // console.log("Before saving user, password:", user.password);

    await user.save();

    // console.log("After saving the password: ", user.password);

    // Delete the used reset token
    await resetToken.deleteOne();

    // Send a confirmation email
    await sendEmail(user.email, 'Password Reset Successful', `Your password has been successfully reset to ${user.password}!`);

    res.json({ msg: 'Password successfully reset!' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Route to delete a user (protected)
router.delete('/delete-user/:id', authenticateToken, async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Ensure the user making the request is the one being deleted
      if (req.user.id !== userId) {
        return res.status(403).json({ msg: 'Unauthorized action' });
      }
  
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json({ msg: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

  
  
module.exports = router;
