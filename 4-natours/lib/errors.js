const ErrorCodes = {
    'REQUIRED_PROPERTY_NOT_FOUND': 'REQUIRED_PROPERTY_NOT_FOUND'
};

const ErrorMessages = {
    'REQUIRED_PROPERTY_NOT_FOUND': (resourceType, property) => `A ${resourceType} must have a ${property} property.`,
};

function createErrorMessage(errorCode, ...args) {
    const message = ErrorMessages[errorCode];

    /* Simple message. Not a template. */
    if (typeof message !== 'function')
        return message;

    return message(...args);
}

module.exports = {
    ErrorCodes,

    createErrorMessage
};
