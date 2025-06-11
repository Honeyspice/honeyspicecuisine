module.exports = {
  // Security settings
  security: {
    rateLimit: {
      windowMs: process.env.RATE_LIMIT_WINDOW_MS || 900000, // 15 minutes
      max: process.env.RATE_LIMIT_MAX_REQUESTS || 100
    },
    jwt: {
      expiresIn: '24h',
      refreshExpiresIn: '7d'
    },
    passwordReset: {
      expiresIn: process.env.PASSWORD_RESET_EXPIRY || 3600000 // 1 hour
    },
    accountLock: {
      duration: process.env.ACCOUNT_LOCK_DURATION || 7200000, // 2 hours
      maxAttempts: process.env.MAX_LOGIN_ATTEMPTS || 5
    }
  },

  // Database settings
  database: {
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false, // Disable auto-indexing in production
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    }
  },

  // CORS settings
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
  },

  // Cookie settings
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },

  // Logging settings
  logging: {
    level: 'error',
    format: 'combined'
  }
}; 