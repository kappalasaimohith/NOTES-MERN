function generatePasswordResetEmail(username, resetUrl) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            padding: 30px;
            margin: 0;
          }
          .email-container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 0 auto;
            font-size: 16px;
            line-height: 1.5;
          }
          h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 20px;
          }
          p {
            color: #555;
            font-size: 16px;
            margin-bottom: 15px;
          }
          .btn {
            display: inline-block;
            padding: 14px 24px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
          }
          .btn:hover {
            background-color: #0056b3;
          }
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #888;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Password Reset Request</h1>
          <p>Hi ${username},</p>
          <p>We received a request to reset your password. If you didn't request this, please ignore this email. Your password will not be changed.</p>
          <p>If you did request this, you can reset your password by clicking the link below:</p>
          <a href="${resetUrl}" class="btn">Reset Your Password</a>
          <p>This link will expire in 1 hour, so make sure to reset your password within that time.</p>
          <p>If you have any questions, feel free to <a href="mailto:saimohith.k123@gmail.com" style="color: #007bff;">contact our support team</a>.</p>
        </div>
        <div class="footer">
          <p>If you did not request a password reset, please disregard this message. Your account is safe.</p>
          <p>&copy; ${new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
};

module.exports = generatePasswordResetEmail;
