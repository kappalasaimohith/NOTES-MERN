# MERN Note-Taking App

This project is a full-stack note-taking application built using the MERN stack (MongoDB, Express, React, Node.js) with Vite as the frontend build tool. It features user authentication with JWT and is styled using Tailwind CSS. Users can register, log in, and manage their personal notes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Register and log in with secure authentication using JWT.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Responsive Design**: Styled with Tailwind CSS for a responsive and clean UI.
- **Protected Routes**: Access control using protected routes for authenticated users.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, JSON Web Tokens (JWT)
- **Database**: MongoDB

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB instance (local or cloud) with connection URI.
- A code editor like VSCode.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kappalasaimohith/NOTES-MERN.git
   cd NOTES-MERN
   ```

2. **Backend Setup**

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Install backend dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file in the `backend` directory and add your Email, App specific email password, MongoDB URI and JWT secret:

     ```plaintext
     MONGO_URI = your_mongodb_uri_here
     JWT_SECRET = your_jwt_secret_here
     PORT=5000
     EMAIL_USER = your_email_here
     EMAIL_PASS = your_app_specific_email_password
     ```

3. **Frontend Setup**

   - Navigate to the frontend directory:

     ```bash
     cd ../frontend
     ```

   - Install frontend dependencies:

     ```bash
     npm install
     ```

## Running the Application

1. **Start the Backend Server**

   - Navigate to the `backend` directory and start the server:

     ```bash
     cd backend
     node server.js
     ```

   The backend server will run on `http://localhost:5000`.

2. **Start the Frontend Development Server**

   - Navigate to the `frontend` directory and start the Vite development server:

     ```bash
     cd frontend
     npm run dev
     ```

   The frontend will be available at `http://localhost:5173`.

## Project Structure

Here's an overview of the project structure:

```
NOTES-MERN/
├── backend/
│   ├── models/
│   │   ├── Note.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── notes.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Login.jsx
    │   │   ├── NoteForm.jsx
    │   │   ├── NoteList.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   └── Register.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── vite.config.js
```

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add your feature description'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
