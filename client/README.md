# Project #10 - Argent Bank Client

This codebase contains the code needed to run the frontend for Argent Bank.

## Getting Started

### Prerequisites

Argent Bank Client uses the following tech stack:

- [Node.js v20](https://nodejs.org/en/)
- [React 18](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

Please make sure you have the right version of Node.js installed. You can verify this by using the following command in your terminal:

```bash
# Check Node.js version
node --version
```

### Instructions

1. Make sure the backend API is running (see main README.md)
1. Open a terminal window in the client folder
1. Run the following commands:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

Your client application should now be running at http://localhost:5173 (or another port if 5173 is in use).

## Available User Accounts

You can sign in with the following test accounts (populated by the backend):

### Tony Stark

- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- Email: `steve@rogers.com`
- Password: `password456`

## Tech Stack

The client application uses:

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence (for preferences only)
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **JWT Decode** - JWT token decoding

## Application Architecture

The application follows a Redux-first architecture with three main slices:

```
Redux Store
├── auth    → Authentication (JWT token, userId)
├── prefs   → User preferences (remembered email)
└── [future slices]
```

### Project Structure

```
src/
├── api/              # Axios configuration + in-memory token management
├── features/         # Redux slices (auth, prefs)
├── store/            # Redux store configuration
├── pages/            # Page components (Home, SignIn, User)
├── components/       # Reusable components (Header, Footer)
└── styles/           # CSS stylesheets
```

## Features

- ✅ User authentication with JWT
- ✅ Protected routes
- ✅ User profile management (view and edit)
- ✅ "Remember me" functionality (email only)
- ✅ Automatic token injection in HTTP requests
- ✅ Session management (in-memory token storage)

## API Endpoints

The client communicates with the backend API at `http://localhost:3001`:

- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/profile` - Get user profile (protected)
- `PUT /api/v1/user/profile` - Update user profile (protected)

## Security

The application implements the following security measures:

- Token stored **in memory only** (not in localStorage)
- Automatic token injection via Axios interceptors
- Protected routes requiring authentication
- Token cleared on logout

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```
