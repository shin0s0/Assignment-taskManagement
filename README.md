# Task Management Application

This is a simple **Task Management API** built using **Node.js**, **Express.js**, and **MongoDB**. The API allows users to register, log in, and manage tasks (create, read, update, delete) after authenticating using **JWT (JSON Web Tokens)**.

## Features

- **User Registration**: Users can create an account.
- **User Login**: Users can log in to the system and receive an authentication token.
- **JWT Authentication**: Each request must be authenticated with a JWT token.
- **Task Management**: Authenticated users can perform the following actions:
  - Create new tasks.
  - Get all tasks created by the user.
  - Update a specific task.
  - Delete a specific task.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing users and tasks.
- **Mongoose**: ODM for MongoDB to define models and interact with the database.
- **JWT (JSON Web Token)**: For user authentication and authorization.
- **bcrypt.js**: To hash user passwords before saving them in the database.
  
## Prerequisites

Make sure you have the following installed:

- **Node.js**: (https://nodejs.org/)
- **MongoDB**: Either install MongoDB locally or use MongoDB Atlas.
  
## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/task-management-api.git
   cd task-management-api
   
2. **Install Dependencies**:

bash
npm install

3. **Create the .env file**:

In the root directory of the project, create a .env file and add the following:

MONGO_URI=your_mongodb_connection_string   # Your MongoDB connection string
JWT_SECRET=your_jwt_secret                 # Secret key for JWT signing
PORT=3000                                  # Port on which your app will run (optional, default: 3000)

Example .env file:
MONGO_URI=mongodb://localhost:27017/taskDB
JWT_SECRET=mysecretkey123
PORT=3000

4. **Start the application**:

Run the following command to start the server:

npm start
The server will start running on the port specified in your .env file (default: 5000).

**API Endpoints**:

Authentication Endpoints

1. Register a new user

Endpoint: /api/auth/register
Method: POST
Request Body:
json

{
  "username": "your_username",
  "email": "your_email@example.com",
  "password": "your_password"
}

Response:

Success: 201 Created, with a JWT token in the response body.
Error: 400 Bad Request if validation fails or 500 Internal Server Error for server issues.

2. Login an existing user

Endpoint: /api/auth/login
Method: POST
Request Body:
json

{
  "email": "your_email@example.com",
  "password": "your_password"
}

Response:

Success: 200 OK, with a JWT token in the response body.
Error: 400 Bad Request for invalid credentials or 500 Internal Server Error.


Task Endpoints (Authenticated)
3. Create a new task

Endpoint: /api/tasks
Method: POST
Headers:
Authorization: Bearer <JWT Token>

Request Body:
json

{
  "title": "Task Title",
  "description": "Task description (optional)",
  "status": "pending",
  "dueDate": "YYYY-MM-DD"
}

Response:

Success: 201 Created with the task data.
Error: 400 Bad Request for validation issues or 500 Internal Server Error.

4. Get all tasks for the authenticated user

Endpoint: /api/tasks
Method: GET
Headers:
Authorization: Bearer <JWT Token>

Response:

Success: 200 OK with the user's tasks.
Error: 500 Internal Server Error.

5. Update a specific task

Endpoint: /api/tasks/:id
Method: PUT
Headers:
Authorization: Bearer <JWT Token>

Request Body:

{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "in-progress",
  "dueDate": "YYYY-MM-DD"
}

Response:

Success: 200 OK with the updated task data.
Error: 404 Not Found if the task doesn't exist or doesn't belong to the user, or 500 Internal Server Error.

6. Delete a specific task

Endpoint: /api/tasks/:id
Method: DELETE
Headers:
Authorization: Bearer <JWT Token>

Response:
Success: 200 OK with a success message.
Error: 404 Not Found if the task doesn't exist or 500 Internal Server Error.


**Project Structure**

task-management-api/
├── controllers/        # Contains controllers for authentication and task management
├── models/             # Contains MongoDB models for User and Task
├── middlewares/        # Contains middleware (e.g., auth for JWT validation)
├── routes/             # Defines API routes
├── .env                # Environment variables file
├── app.js              # Main application file
└── package.json        # Node.js package configuration

**Run the Project**

Install all dependencies using npm install.

Set up your .env file with MongoDB connection string and JWT secret.

Run the application with npm start.