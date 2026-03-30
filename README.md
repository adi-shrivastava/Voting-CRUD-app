🗳️ Voting System Backend API

A scalable and secure backend service for a voting platform, built using Node.js, Express, and MongoDB.
Implements authentication, role-based authorization, and strict vote integrity (one voter → one vote).

---

📌 Overview

This project simulates a real-world voting system where:

- Users can register and securely authenticate
- Admins manage candidates
- Each voter is allowed to vote only once
- Votes are tracked and ranked via a leaderboard system

The architecture follows a modular design with separation of concerns for better scalability and maintainability.

---

✨ Key Features

- 🔐 JWT-based Authentication
- 🛡️ Role-Based Authorization (Admin / Voter)
- 🗳️ Single Vote Enforcement (No Double Voting)
- 📊 Dynamic Leaderboard (Sorted by votes)
- 🧩 Modular MVC-like Architecture
- ⚙️ RESTful API Design
- 🔒 Secure Password Handling (hashed + validated)

---

🏗️ Architecture

Client → Routes → Controllers → Models → MongoDB

- Routes: API endpoints
- Controllers: Business logic
- Models: MongoDB schemas
- Middlewares: Authentication & access control

---

🛠️ Tech Stack

Layer| Technology
Backend| Node.js, Express
Database| MongoDB, Mongoose
Auth| JSON Web Tokens (JWT)
Tools| Postman, Git

---

📁 Project Structure

controllers/
models/
routes/
middlewares/
config/
server.js
.env

---

🔑 API Endpoints

🔐 Authentication

- "POST /signup" → Register a new voter
- "POST /login" → Authenticate and receive JWT

---

👤 Voter

- "GET /profile" → Get logged-in voter profile
- "PUT /profile/password" → Update password

---

🗳️ Voting

- "POST /vote" → Cast vote (restricted to one vote per user)

---

🧑‍💼 Candidate Management (Admin Only)

- "POST /candidates" → Add candidate
- "PUT /candidates/:id" → Update candidate
- "DELETE /candidates/:id" → Delete candidate

---

📊 Public Data

- "GET /candidates" → Fetch all candidates
- "GET /candidates/leaderboard" → Get ranked candidates

---

🔐 Security & Integrity

- Each voter has a unique Aadhaar identifier
- Voting is restricted using an "isVoted" flag
- JWT middleware ensures only authenticated access
- Admin-only actions protected via role checks

---

⚙️ Setup & Installation

git clone https://github.com/adi-shrivastava/Voting-CRUD-app
cd Voting-CRUD-app
npm install

Environment Variables

Create a ".env" file:

PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

---

Run Server

npm start

---

🧪 Testing

- Use Postman to test all endpoints
- Include JWT token in headers for protected routes

---

📈 Future Enhancements

- Election start/end state control
- Rate limiting for vote API
- Real-time vote updates (WebSockets)
- Frontend integration (React)

---

👨‍💻 Author

***Adi Shrivastava***


