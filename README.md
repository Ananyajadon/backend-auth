# Authentication Project

## Overview
This project is a robust authentication system built using **Node.js**, **Express.js**, and **MongoDB**. It implements modern security practices to handle user registration, login, and secure session management.

## Features
- User Registration
- User Login
- Password Hashing using **bcrypt**
- JWT-based Authentication for secure and stateless sessions
- Middleware for route protection
- Error handling for better debugging

## Technologies Used
- **Node.js**: Backend runtime environment
- **Express.js**: Web framework for building RESTful APIs
- **MongoDB**: NoSQL database for user data storage
- **bcrypt**: For password hashing
- **jsonwebtoken**: For token-based authentication
- **cookie-parser**: To handle cookies in the application
- **ejs**: For rendering views dynamically

## API Endpoints
### Authentication Routes
- **POST /register**: Register a new user
  - Request body: `{ username, email, password }`

- **POST /login**: Authenticate a user and issue a JWT
  - Request body: `{ email, password }`

### Protected Routes
- **GET /dashboard**: Access user-specific data (JWT required)

## How It Works
1. **User Registration**: Passwords are hashed using **bcrypt** and stored securely in MongoDB.
2. **User Login**: Credentials are validated, and a signed JWT is issued for session management.
3. **Protected Routes**: Middleware validates the JWT before granting access to sensitive data.

## Folder Structure
```
authentication-project
│
├── controllers     # Handles business logic
├── models          # Mongoose models for MongoDB
├── routes          # API route definitions
├── views           # EJS templates
├── package.json    # Project metadata and dependencies
├── README.md       # Project documentation
└── index.js        # Entry point of the application
```

## License
This project is licensed under the MIT License.

## Contributions
Feel free to fork this repository and submit pull requests for new features, improvements, or bug fixes.
