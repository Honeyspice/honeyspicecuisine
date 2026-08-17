const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const mongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Render / nginx / load balancers set X-Forwarded-*, required for express-rate-limit and real client IPs
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false // Disable CSP for development
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path.startsWith('/api/payments'),
});

// Apply rate limiting to all routes
app.use(limiter);

// CORS configuration
const allowedOrigins = new Set([
  'http://localhost:3000',
  'http://127.0.0.1:3000',
]);

if (process.env.FRONTEND_URL) {
  allowedOrigins.add(process.env.FRONTEND_URL.trim());
}

if (process.env.VERCEL_URL) {
  allowedOrigins.add(`https://${process.env.VERCEL_URL.trim()}`);
}

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (curl, server-to-server).
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) return callback(null, true);

      // Allow Vercel preview domains for this project.
      if (origin.endsWith('.vercel.app')) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// CSRF protection
const csrfProtection = csrf({ 
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Apply CSRF protection to all routes except GET requests
app.use((req, res, next) => {
  if (req.method === 'GET') {
    next();
  } else if (req.path.startsWith('/api/payments')) {
    next();
  } else if (req.path.startsWith('/api/mealplan')) {
    next(); // JWT-protected, no CSRF needed
  } else {
    csrfProtection(req, res, next);
  }
});

// Add CSRF token to response
app.use((req, res, next) => {
  if (req.csrfToken) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
  }
  next();
});

// Request sanitization
app.use(mongoSanitize());

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Database connection with better error handling
const connectDB = async () => {
  const fallbackLocal = 'mongodb://localhost:27017/honeyspicecuisine';
  const mongoUri = process.env.MONGODB_URI || fallbackLocal;

  if (process.env.NODE_ENV === 'production') {
    const looksLocal =
      !process.env.MONGODB_URI ||
      /localhost|127\.0\.0\.1|::1/.test(mongoUri);
    if (looksLocal) {
      console.error(
        'MONGODB_URI must be set in production to a hosted MongoDB URL (e.g. MongoDB Atlas). ' +
          'localhost will not work on Render.'
      );
      process.exit(1);
    }
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don’t crash the whole API in development if Mongo is down.
    // This allows non-DB endpoints (e.g. Stripe session creation) to keep working.
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.warn('Continuing without MongoDB (development mode).');
    }
  }
};

connectDB();

// Root URL (Render / browser health check), no HTML, just JSON
app.get('/', (req, res) => {
  res.json({
    message: 'Honeyspice API is running',
    api: '/api',
  });
});
app.head('/', (req, res) => {
  res.status(200).end();
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/menu', require('./routes/menu'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/mealplan', require('./routes/mealplan'));

// API root route handler
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to Honeyspice API' });
});

// Error handling middleware with better logging
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params
  });
  
  // Don't expose internal errors to client
  const errorMessage = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;
    
  res.status(err.status || 500).json({ 
    message: errorMessage,
    path: req.path,
    method: req.method
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set'}`);
}); 