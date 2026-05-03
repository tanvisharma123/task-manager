# Task Manager

A full-stack team task manager application built with React, Node.js, Express, and MongoDB. It includes authentication, role-based access, project management, task assignment, and dashboard statistics.

## Features

- User signup and login with JWT authentication
- Admin and member roles
- Project creation and member management
- Task creation, assignment, status updates, and due dates
- Dashboard summary for task progress
- Protected API routes
- Responsive React frontend styled with Tailwind CSS

## Tech Stack

**Frontend**

- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS

**Backend**

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- express-validator
- CORS

## Project Structure

```text
task-manager/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      utils/
      validators/
      app.js
      server.js
  frontend/
    src/
      api/
      components/
      context/
      pages/
      styles/
      App.jsx
      index.jsx
```

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=5000
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

For Railway deployment, set the frontend variable like this:

```text
VITE_API_URL=https://task-manager-production-2e5a.up.railway.app/api
```

## Local Setup

Clone the repository:

```bash
git clone https://github.com/tanvisharma123/task-manager.git
cd task-manager
```

Install backend dependencies:

```bash
cd backend
npm install
```

Start the backend:

```bash
npm run dev
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on Vite, and the backend defaults to port `5000`.

## Available Scripts

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm start
npm run preview
```

## API Routes

Auth:

```text
POST /api/auth/signup
POST /api/auth/login
```

Projects:

```text
GET /api/projects
POST /api/projects
GET /api/projects/:projectId
PUT /api/projects/:projectId/members
```

Tasks:

```text
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:taskId
```

Dashboard:

```text
GET /api/dashboard
```

Protected routes require a JWT token in the `Authorization` header:

```text
Authorization: Bearer <token>
```

## Deployment Notes

The frontend is configured for Railway preview hosting in `frontend/vite.config.js`.

Frontend production start command:

```bash
npm start
```

Backend production start command:

```bash
npm start
```

Make sure Railway has the required environment variables for both services before deploying.
