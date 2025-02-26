const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// PasswordResetToken Schema 
const PasswordResetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Index on userId for faster lookup
  },
  token: {
    type: String,
    required: true,
    unique: true, // Ensuring token is unique
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => Date.now() + 3600 * 1000, // Expiry in 1 hour (in milliseconds)
  },
});

// Pre-save hook to hash the token before saving
PasswordResetTokenSchema.pre('save', async function(next) {
  if (this.isModified('token')) {
    try {
      this.token = await bcrypt.hash(this.token, 10);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Method to compare a plain token with the hashed token in the database
PasswordResetTokenSchema.methods.compareToken = async function(candidateToken) {
  try {
    return await bcrypt.compare(candidateToken, this.token);
  } catch (error) {
    throw new Error('Token comparison failed');
  }
};

module.exports = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);
