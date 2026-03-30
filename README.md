# 🗳️ Voting System Backend API

A scalable and secure backend service for a voting platform built using **Node.js, Express, and MongoDB**.  
It ensures **one voter → one vote** with proper authentication and role-based access control.

---

## 📌 Overview

This project simulates a real-world voting system where:

- Users can register and login securely  
- Admins manage candidates  
- Each voter can vote only once  
- Votes are tracked and ranked via a leaderboard  

---

## ✨ Key Features

- 🔐 JWT-based Authentication  
- 🛡️ Role-Based Authorization (Admin / Voter)  
- 🗳️ One Person → One Vote  
- 📊 Leaderboard (sorted by votes)  
- ⚙️ RESTful API Design  
- 🔒 Secure password handling  

---

## 🏗️ Architecture

```
Client → Routes → Controllers → Models → Database
```

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JSON Web Tokens (JWT)  
- Postman  

---

## 📁 Project Structure

```
controllers/
models/
routes/
middlewares/
config/
server.js
.env
```

---

## 🔑 API Endpoints

### 🔐 Authentication
- POST `/signup`
- POST `/login`

### 👤 Voter
- GET `/profile`
- PUT `/profile/password`

### 🗳️ Voting
- POST `/vote`

### 🧑‍💼 Candidate (Admin Only)
- POST `/candidates`
- PUT `/candidates/:id`
- DELETE `/candidates/:id`

### 📊 Public
- GET `/candidates`
- GET `/candidates/leaderboard`

---

## 🔐 Security & Logic

- Aadhaar is unique per voter  
- `isVoted` flag prevents double voting  
- JWT protects private routes  
- Admin-only routes restricted via role check  

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/adi-shrivastava/Voting-CRUD-app
cd Voting-CRUD-app
npm install
```

---

### Environment Variables

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

### ▶️ Run Server

```bash
npm start
```

---

## 📈 Future Improvements

- Election control (start/end)  
- Rate limiting  
- Real-time updates  

---

## 👨‍💻 Author

***Adi Shrivastava***