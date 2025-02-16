
# Task Manager

Develop a Task Manager web application that supports full CRUD operations for tasks while integrating user authentication and profile management. This application should allow users to sign up, log in, update their profile, and recover their accounts through "forgot password" and "reset password" functionalities use React to manage state and handle API integration on the front-end. 


## Setup Instructions

### 1. Clone the repository from the master branch:
```bash
git clone https://github.com/liton-cse/TaskManager.git

cd project-name

npm install

npm start


```
## Overview

### 1. State Management: 
This project is built using React for the frontend, and the API is integrated using Axios.

---

### 2. API Integration:
The application uses Axios to handle API requests. Axios is configured to handle authentication tokens for API requests, and error handling is integrated for graceful failover.Axios is used to make HTTP requests to interact with the API. The common flow for fetching data from an API or sending requests involves calling an Axios function within context providers or components.

---

## Security Measures

### 1. JWT Authentication
The app uses JWT (JSON Web Tokens) for authentication. After a successful login, a token is generated and returned to the frontend, which is then stored in localStorage or cookies. This token is used for subsequent API requests by including it in the Authorization header.

---

### 2. Password Hashing

Passwords are hashed using bcrypt before being stored in the database. This ensures that user passwords are never saved in plain text

---

### 3. Token Validation

Each time the app sends a request to a protected route, the server checks if the provided JWT token is valid. If the token is invalid or expired, the server responds with an authentication error

---

### 4. CORS (Cross-Origin Resource Sharing)

CORS settings are configured on the server to ensure that only the allowed frontend domains can access the API

---





