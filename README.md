# Auth System

A full-stack authentication system with user registration, email verification, login, password reset, and account management.

## Description

This project implements a secure authentication system using a React frontend and a Node.js/Express backend with MySQL. It includes full user lifecycle management including registration, login, email verification, password recovery, and account deletion.

## Features

- User registration with email verification
- Secure login with JWT authentication
- HTTP-only cookie session handling
- Password hashing (bcrypt)
- Forgot password with email reset code
- Password reset flow with token validation
- Change password (authenticated users)
- User profile management
- Account deletion with email notification
- Swagger API documentation

## Project Structure

### Frontend

auth-system-frontend

-React

### Backend

auth-system-backend

-Node.js
-Express.js
-MySQL

## Getting Started

1. Clone the repository:
   git clone <repo-url>
2. Install dependencies:

### Backend

cd auth-system-backend
npm install

### Frontend

cd auth-system-frontend
npm install 3. Run the application:

### Backend

npm run dev

### Frontend

npm start

## Environment Variables

Create a .env file inside auth-system-backend:

PORT=5000
HOST=127.0.0.1
CLIENT_ORIGIN=http://localhost:3000

EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

DB_HOST=db_host
DB_USER=db_user
DB_PASSWORD=your_password
DB_NAME=auth_system
DB_PORT=3306

JWT_SECRET=your_secret_key

## API Documentation

Swagger UI available at:

http://127.0.0.1:5000/api-docs

## Screenshots

### Authentication Flow

- Password validation errors
- Email verification process
- Login and registration states

### System Screens

#### Registration

![Password Error](screenshots/passworderror.png)
![Password Mismatch](screenshots/passwordsdonotmatch.png)
![Existing Email](screenshots/emailexists.png)
![Registration Successful](screenshots/registrationsuccessful.png)

#### Email Verification

![Verification Email](screenshots/verificationemail.png)
![Email Verification Success](screenshots/emailverificationsuccess.png)
![Welcome Email](screenshots/welcomeemail.png)

#### Login

![Login Screen](screenshots/loginscreen.png)
![Login Error](screenshots/loginerror.png)
![Login Success](screenshots/loginsuccess.png)

#### Dashboard & Account

![Dashboard](screenshots/dashboard.png)
![Delete Account](screenshots/deleteaccount.png)
![Delete Account Success](screenshots/deleteaccountsuccess.png)
![Delete Account Email](screenshots/accountdeletionemail.png)

## Notes

- Passwords are securely hashed using bcrypt
- JWT is stored in HTTP-only cookies
- Email verification is required before login
- Reset tokens are hashed and time-limited
- Deleted accounts are logged before removal

## Future Improvements

- Refresh token rotation
- Rate limiting (login/reset endpoints)
- Role-based access control (RBAC)
- Redis session storage
- Email queue system (BullMQ)
- Account lock after failed login attempts

## License

MIT
