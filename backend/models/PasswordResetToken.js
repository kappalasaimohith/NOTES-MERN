const mongoose = require('mongoose');

const PasswordResetTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);
