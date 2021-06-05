const logger = require('pino')({
    name: 'natours',
    prettyPrint: true,
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
});

const LoggingCodes = {
    'DATABASE_CONNECTED': 'DATABASE_CONNECTED',

    'CREATED_RESOURCE': 'CREATED_RESOURCE',
    'READ_RESOURCE': 'READ_RESOURCE',
    'READ_BY_ID_RESOURCE': 'READ_BY_ID_RESOURCE',
    'UPDATE_RESOURCE': 'UPDATE_RESOURCE',
    'DELETE_RESOURCE': 'DELETE_RESOURCE'
};

const LoggingMessages = {
    'DATABASE_CONNECTED': 'Successfully connected to the database.',

    'CREATED_RESOURCE': (resourceType) => `Successfully created a ${resourceType}.`,
    'READ_RESOURCE': (resourceType) => `Successfully read ${resourceType}s.`,
    'READ_BY_ID_RESOURCE': (resourceType) => `Successfully read by id a ${resourceType}.`,
    'UPDATE_RESOURCE': (resourceType) => `Successfully updated a ${resourceType}.`,
    'DELETE_RESOURCE': (resourceType) => `Successfully deleted a ${resourceType}.`
};

function createLoggingMessage(loggingCode, ...args) {
    const message = LoggingMessages[loggingCode];

    /* Simple message. Not a template. */
    if (typeof message !== 'function')
        return message;

    return message(...args);
}

module.exports = {
    logger,
    createLoggingMessage,

    LoggingCodes
};
