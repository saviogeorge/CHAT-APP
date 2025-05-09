
# CHAT-APP

A real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It features JWT-based authentication and supports both individual messaging.​

## 🚀 Features
Real-Time Communication: Instant messaging with real-time updates.
User Authentication: Secure sign-up and login using JWT.
Responsive UI: User-friendly interface built with React.
RESTful API: Backend API built with Express.js and Node.js.
MongoDB Integration: Data persistence using MongoDB Atlas.​

## 🛠️ Tech Stack

Frontend: React.js, TailwindCSS, DaisyUI, Zustand (state management)

Backend: Node.js, Express.js, Socket.io

Database: MongoDB Atlas

Authentication: JWT (JSON Web Tokens)

Environment Management: dotenv​

## 📦 Installation
Prerequisites
Node.js (v20.18.0)
npm
MongoDB Atlas account​

## Clone the Repository
```
git clone https://github.com/saviogeorge/CHAT-APP.git
cd CHAT-APP
```

Environment Variables
Create a .env file in the backend directory and add the following:
```
MONGODB_URI=<Your MongoDB Atlas URI>
PORT=5001
JWT_SECRET=<Your JWT Secret>
NODE_ENV=development
```

# 🚀 Getting Started

## Backend Setup
```
cd backend
nvm use 20.18.0
npm install
npm run dev
```

## Frontend Setup
```
cd frontend
nvm use 20.18.0
npm install
npm run dev
```


# 📁 Project Structure
```
CHAT-APP/
├── backend/
│   ├── controllers/
│   |── lib/
│   |── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
|   |   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
├── README.md
```
![snapshot](https://github.com/saviogeorge/CHAT-APP/blob/main/frontend/public/Screenshot%20from%202025-04-06%2012-50-28.png)

# References
https://www.youtube.com/watch?v=ntKkVrQqBYY&t=625s

