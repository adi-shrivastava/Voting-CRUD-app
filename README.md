# 🗳️ Voting System API

A secure and scalable voting system backend built using **Node.js, Express, and MongoDB**.  
This project implements authentication, role-based access, and CRUD operations, allowing users to vote and admins to manage candidates efficiently.

---

## 🚀 Features

- 🔐 JWT Authentication (Signup & Login)
- 🔒 Password hashing using bcrypt
- 👤 Role-based access (User / Admin)
- 🗳️ One-user-one-vote restriction
- 📋 CRUD operations for candidates
- 📊 Candidate-wise voting results
- ⚡ RESTful API architecture
- 📮 Postman API collection included

---

## 🧠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcrypt

---

## 🔑 Authentication Flow

1. User signs up → password is hashed  
2. User logs in → JWT token is generated  
3. Token is sent via: Authorization: Bearer <token>

4. Protected routes verify token before access  

---

## 📌 API Endpoints

### 👤 Auth
- `POST /person/signup` → Register user  
- `POST /person/login` → Login & get JWT  

### 🗳️ Voting
- `GET /candidates` → View candidates  
- `POST /vote` → Vote (restricted to once per user)  
- `GET /results` → View vote counts  

### 👑 Admin
- `POST /candidate` → Create candidate  
- `PUT /candidate/:id` → Update candidate  
- `DELETE /candidate/:id` → Delete candidate  

---

## 📮 Postman Collection

This project includes a Postman collection for easy API testing.

### 🔹 How to use:
1. Open Postman  
2. Click **Import**  
3. Select the provided collection file (`VotingSystem.postman_collection.json`)  
4. Run requests directly  

### 🔹 Authorization:
- Use **Bearer Token**  
- Add token in headers:
---

## ⚙️ Setup

```bash
git clone <repo-link>
cd voting-system
npm install
```
Create .env file:

```bash
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_uri
PORT=3000
```

Run server:
```bash
node server.js
```
---
💡 Future Improvements
Frontend integration (React)
Real-time vote updates
Rate limiting & security enhancements
Unit testing

👨‍💻 Author

***Adi Shrivastava***
