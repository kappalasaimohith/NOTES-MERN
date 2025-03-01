const express = require('express');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/authenticateToken');
// const Note = require('../models/Note');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');

const apiurl = "http://localhost:5173";

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ username, email, password });
    await user.save();

    await sendEmail(email, 'Welcome to Our App', `Hi ${username}, welcome to our app!`);

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found for email:", email);
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log("User found:", user.email);
    // console.log("Stored password in DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(400).json({ error: error.message });
  }
});


router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    await PasswordResetToken.deleteMany({ userId: user._id });
    const token = crypto.randomBytes(32).toString('hex');
    const resetToken = new PasswordResetToken({ userId: user._id, token });
    await resetToken.save();

    const resetUrl = `${apiurl}/reset-password/${token}`;

    await sendEmail(email, 'Password Reset Request', `Click the following link to reset your password: ${resetUrl}`);
    console.log("Reset Token Generated:", token);
    res.json({ msg: 'Password reset link sent!' });
  } catch (error) {
    console.error('Error during forgot password process:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    // console.log("Token received:", token);
    const resetToken = await PasswordResetToken.findOne({});
    if (!resetToken) {
      console.log("Token not found or expired.");
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }
    const isMatch = await resetToken.compareToken(token);
    if (!isMatch) {
      console.log("Token does not match stored hashed token.");
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
      console.log("User not found for this token.");
      return res.status(400).json({ msg: 'User not found' });
    }
    const salt = await bcrypt.genSalt(10);
    console.log("Old password:", user.password);
    user.password = password;
    // user.password = await bcrypt.hash(password, salt);
    // console.log("New hashed password:", user.password);
    const updatedUser = await user.save();
    console.log("Updated User:", updatedUser);


    await resetToken.deleteOne();

    await sendEmail(user.email, 'Password Reset Successful', `Your password has been successfully reset!`);

    res.json({ msg: 'Password successfully reset!' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.delete('/delete-user/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.user.userId !== userId) {
      return res.status(403).json({ msg: 'Unauthorized action' });
    }

    // const deletedNotes = await Note.deleteMany({ userId });
    // console.log("User ID: ",userId);
    // console.log("Authenticated User ID:", req.user.userId);
    // console.log("Deleted notes count:", deletedNotes.deletedCount);
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/user-profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;
