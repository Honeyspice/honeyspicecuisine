# Honeyspice - Food Delivery Platform

A modern food delivery platform built with React and Node.js.

## Project Structure

```
honeyspice/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── styles/       # Global styles and theme
│   │   └── utils/        # Utility functions
│   └── public/           # Static files
└── backend/              # Node.js backend
    ├── controllers/      # Route controllers
    ├── models/          # Database models
    ├── routes/          # API routes
    └── middleware/      # Custom middleware
```

## Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/honeyspice.git
cd honeyspice
```

2. Install frontend dependencies:
```bash
cd frontend
yarn install
```

3. Install backend dependencies:
```bash
cd ../backend
yarn install
```

4. Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
yarn dev
```

2. Start the frontend development server:
```bash
cd frontend
yarn start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features

- User authentication and authorization
- Menu browsing and searching
- Order placement and tracking
- User profile management
- Admin dashboard
- Responsive design

## Technologies Used

### Frontend
- React
- Material-UI
- React Router
- Styled Components
- Axios

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 