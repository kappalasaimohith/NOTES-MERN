function generateWelcomeEmail(username, apiurl) {
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .email-container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            max-width: 650px;
            margin: 0 auto;
            font-size: 16px;
            line-height: 1.6;
          }
          h1 {
            color: #1a73e8;
            font-size: 32px;
            margin-bottom: 20px;
            text-align: center;
            font-weight: 600;
          }
          p {
            color: #555;
            font-size: 18px;
            margin-bottom: 20px;
            text-align: center;
            line-height: 1.8;
          }
          .btn-container {
            text-align: center; /* Center the button container */
            margin-top: 25px;
          }
          .btn {
            display: inline-block;
            padding: 14px 30px;
            background-color: #1a73e8;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            transition: background-color 0.3s ease;
          }
          .btn:hover {
            background-color: #0c5fa0;
          }
          .footer {
            margin-top: 40px;
            font-size: 14px;
            color: #888;
            text-align: center;
          }
          .footer a {
            color: #1a73e8;
            text-decoration: none;
          }
          .footer p {
            margin: 10px 0;
          }
          .footer .social-links a {
            margin: 0 10px;
            text-decoration: none;
            font-size: 20px;
            color: #1a73e8;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <h1>Welcome to Our App, ${username}!</h1>
          <p>We are excited to have you join our community! Your account is now ready, and we can't wait for you to start exploring everything we have to offer.</p>
          <p>Click the button below to get started:</p>
          <div class="btn-container">
            <a href="${apiurl}" class="btn">Get Started</a>
          </div>
          <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
        </div>
        
        <div class="footer">
          <p>Have any questions? Feel free to <a href="mailto:saimohith.k123@gmail.com">contact us</a>.</p>
          <p>&copy; ${new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </body>
    </html>
  `;
}

module.exports = generateWelcomeEmail;
