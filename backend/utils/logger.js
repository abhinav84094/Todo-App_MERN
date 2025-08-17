const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
level: 'info', // Log level
format: winston.format.combine(
winston.format.timestamp(),
winston.format.json()
),
transports: [
new winston.transports.Console(), // Log to console
new winston.transports.File({ filename: 'combined.log' }) // Log to file
]
});

// Log messages
logger.info('This is an info message');
logger.error('This is an error message');