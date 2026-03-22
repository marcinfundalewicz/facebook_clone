# 🚀 Facebook Clone (Fullstack App)

A modern fullstack social media application inspired by Facebook, built with **React + Spring Boot + MySQL + Docker**.

This project demonstrates a production-like architecture including authentication with JWT, layered backend structure, and containerized deployment.

---

# 🧠 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA / Hibernate
- Liquibase (database migrations)

### Frontend
- React
- Vite
- Axios
- HTML / CSS / JavaScript

### Database
- MySQL (Docker)

### DevOps
- Docker
- Docker Compose

---

# ✨ Features

- 🔐 User registration & login (JWT)
- 📝 Create posts (with optional image)
- ❤️ Likes / reactions
- 💬 Comments system
- 👥 Friends system
- 📰 User feed
- 🔎 Suggested users & activity

---

# 🏗️ Architecture

Frontend → API → Backend → Database

- Controller → Service → Repository (backend)
- Components → Services → API (frontend)

---

# 🧪 Testing

The project includes both unit tests and integration tests.
-	Unit tests (JUnit, Mockito): test business logic in service layer using mocks
-	Integration tests: verify full application flow (controllers → database)

---

# 🐳 Docker Setup

The application runs in 3 containers:

- Backend (Spring Boot)
- Frontend (React + nginx)
- Mysql (database)

---

# 🚀 Getting Started

## Requirements
- Docker

## Run

```bash
docker-compose up --build
```

## Access

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

---

# 🔐 Authentication (JWT)

Each request includes:

```
Authorization: Bearer <token>
```

---

# 📸 Screenshots

### 🏠 Feed
![Feed](./screenshots/feed.png)

### 🔐 Login
![Login](./screenshots/login.png)

### 📝 Register
![Register](./screenshots/register.png)

### 👤 Profile + Comments
![Profile](./screenshots/profile.png)

### 🏗️ Architecture
![Architecture](./screenshots/architecture.png)

---

# 📦 Project Structure

```
backend/     -> Spring Boot API  
frontend/    -> React app  
screenshots/ -> images used in README  
```

---

# 💡 Why this project?

- Practice fullstack architecture
- Implement JWT authentication
- Learn Docker in real-world setup
- Build social media app

---

# 👨‍💻 Author

Marcin Fundalewicz

---

# 🔥 Summary

Fullstack application with:

- Authentication
- Database
- Docker environment

Ready to run with a single command.