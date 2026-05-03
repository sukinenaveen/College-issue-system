# College Issue Management System

A full-stack web application designed to help students raise and track issues within their college, while providing administrators with a powerful dashboard to manage, update, and resolve these issues efficiently.

## 🚀 Features

- **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for Students and Administrators.
- **Student Portal:**
  - Secure registration and login.
  - Raise new issues/complaints.
  - Track the status of their submitted issues (Pending, In Progress, Completed).
  - View personal issue statistics.
- **Admin Dashboard:**
  - Secure login.
  - View all issues raised by all students.
  - Update issue statuses.
  - Provide resolution notes and feedback.
  - View overall issue statistics across the college.
- **Secure Authentication:** JWT-based authentication with bcrypt password hashing.

## 🛠️ Tech Stack

**Frontend:**
- React (built with Vite)
- Tailwind CSS for modern, responsive styling
- React Router DOM for navigation
- Axios for API requests
- Lucide React for iconography

**Backend:**
- Node.js & Express.js
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT) for authentication
- Bcrypt.js for secure password storage

## 📂 Project Structure

```
college-issue-system/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/                # React source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages (Dashboard, Login, etc.)
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── vite.config.js      # Vite configuration
│
└── server/                 # Node.js/Express Backend
    ├── middleware/         # Custom Express middlewares (Auth, etc.)
    ├── models/             # Mongoose schemas (User, Issue)
    ├── server.js           # Express server entry point
    └── package.json        # Backend dependencies
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally, or a MongoDB Atlas URI.

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd college-issue-system
```

### 2. Setup the Backend (Server)

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory. You can copy the provided `.env.example`:
```bash
cp .env.example .env
```

Update the `.env` file with your actual variables:
```env
MONGO_URI=mongodb://localhost:27017/collegeDB
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
```

Start the backend server:
```bash
npm run dev
# Server running on http://localhost:5000
```

### 3. Setup the Frontend (Client)

Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the React development server:
```bash
npm run dev
# Client running on http://localhost:5173 (default Vite port)
```

## 🛡️ Default Roles & Testing

- To test as a **Student**, simply register a new account through the web interface.
- To test as an **Admin**, you may need to manually update a user's role to `"admin"` directly in your MongoDB database using MongoDB Compass or the Mongo shell:
  ```json
  // Example MongoDB update
  db.users.updateOne({ email: "admin@college.edu" }, { $set: { role: "admin" } })
  ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
