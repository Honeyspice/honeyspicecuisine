const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// User validation rules
const userValidationRules = {
  register: [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('Password must contain at least one uppercase letter, one number, and one special character')
  ],
  login: [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ]
};

// Menu item validation rules
const menuItemValidationRules = {
  create: [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').isIn(['sandwiches', 'burgers', 'pizzas', 'desserts', 'drinks'])
      .withMessage('Invalid category'),
    body('preparationTime').isInt({ min: 0 }).withMessage('Preparation time must be a positive number'),
    body('serves').isInt({ min: 1 }).withMessage('Serves must be at least 1')
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid menu item ID'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').optional().isIn(['sandwiches', 'burgers', 'pizzas', 'desserts', 'drinks'])
      .withMessage('Invalid category')
  ]
};

// Order validation rules
const orderValidationRules = {
  create: [
    body('items').isArray().withMessage('Items must be an array'),
    body('items.*.menuItem').isMongoId().withMessage('Invalid menu item ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('deliveryAddress.street').trim().notEmpty().withMessage('Street address is required'),
    body('deliveryAddress.city').trim().notEmpty().withMessage('City is required'),
    body('deliveryAddress.state').trim().notEmpty().withMessage('State is required'),
    body('deliveryAddress.zipCode').trim().notEmpty().withMessage('Zip code is required'),
    body('paymentMethod').isIn(['cash', 'card']).withMessage('Invalid payment method')
  ],
  updateStatus: [
    param('id').isMongoId().withMessage('Invalid order ID'),
    body('status').isIn(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'])
      .withMessage('Invalid status')
  ]
};

module.exports = {
  validate,
  userValidationRules,
  menuItemValidationRules,
  orderValidationRules
}; 