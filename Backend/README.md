# SNITCH Backend

Express + MongoDB backend service for authentication and user management.

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- Password hashing (`bcryptjs`)
- Request validation (`express-validator`)
- Cookie parsing (`cookie-parser`)
- Logging (`morgan`)

## Project Structure

```text
Backend/
  package.json
  server.js
  src/
    app.js
    config/
      config.js
      db.js
    controllers/
      auth.controller.js
    models/
      user.model.js
    routes/
      auth.routes.js
    validator/
      auth.validator.js
```

## Prerequisites

- Node.js 18+
- MongoDB instance (local or cloud)

## Installation

1. Clone the repository.
2. Move into the backend folder:

```bash
cd Backend
```

3. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the `Backend` folder with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Notes

- `MONGO_URI` is required. The app throws on startup if missing.
- `JWT_SECRET` is required. The app throws on startup if missing.

## Running the Server

Development mode (nodemon):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server runs on:

- `http://localhost:5000` (default)
- or the value of `PORT` from `.env`

## API Endpoints

### Health Check

- **GET** `/`
- **Response:**

```json
{
  "message": "API is running"
}
```

### Auth Routes

Base path: `/api/auth`

- **POST** `/api/auth/register`
  - Validation rules:
    - `email` must be valid
    - `contact` must be a 10-digit number
    - `password` must be at least 6 characters
    - `fullName` must be at least 3 characters

## Scripts

From `package.json`:

- `npm start` -> Run server with Node
- `npm run dev` -> Run server with Nodemon

## Current Status

- Database connection is configured with Mongoose.
- User schema includes password hashing via pre-save hook.
- Register validation exists.
- Auth controller and route wiring are still in progress (incomplete implementation).

## License

ISC
