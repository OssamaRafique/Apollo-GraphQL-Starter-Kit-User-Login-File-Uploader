const winston = require('winston');
const { UserInputError } = require('apollo-server-express');

// Add Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {
        service: 'user-service'
    },
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'logs/combined.log'
        }),
    ],
});

module.exports.formatError = (err) => {
    logger.error(err);
    console.error(err);
    if (err.message.startsWith("Variable")) {
        return new UserInputError('Input variables not valid');
    }
    return {
        message: err.message,
        code: err.extensions.code
    };
}