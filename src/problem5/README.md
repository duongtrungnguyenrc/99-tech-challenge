# ExpressJS + TypeScript CRUD API

## Overview

This is a CRUD API built using ExpressJS and TypeScript.

## Setup & Installation

Make sure you have MongoDB instance running on port 27017 (or config connection URL in .env file)

### 1. Move to project directory

```sh
cd problem5
```

### 2. Install dependencies

```sh
npm i
```

### 3. Build application

```sh
npm run build
```

### 4. Run the application

```sh
npm start
```

## 📌 Available Scripts

- `npm run dev` - Start the development server with hot reload.
- `npm run build` - Compile TypeScript files.
- `npm start` - Run the compiled JavaScript files.
- `npm run lint` - Run ESLint for code quality checks.

## 🏗 Project Structure

```plaintext
📦 problem5
├── 📂 src             # Source code
│   ├── 📂 controllers # Request handlers
│   ├── 📂 routes      # API routes
│   ├── 📂 models      # Database models
│   ├── 📂 configs     # Configs
│   ├── app.ts        # Express app configuration
├── 📂 dist           # Compiled output
├── 📜 package.json   # Dependencies and scripts
├── 📜 tsconfig.json  # TypeScript configuration
├── 📜 .eslintrc.json # ESLint configuration
└── 📜 README.md      # This file
```

## 🛠 Technologies Used

- 🚀 [ExpressJS](https://expressjs.com/) - Web framework for Node.js
- 🟦 [TypeScript](https://www.typescriptlang.org/) - Strongly typed JavaScript
- 📦 [Node.js](https://nodejs.org/) - JavaScript runtime
- 🛢 [MongoDB](https://www.mongodb.com/) *(optional)* - NoSQL database

## 🔧 API Endpoints

### 1. Users

- `GET /users` - Retrieve all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

## 🧪 Testing

If using Visual Studio Code, install the **Rest Client** extension and run the `request.http` file (included in the project).

Alternatively, use **Postman** or **cURL** to test the API endpoints.

