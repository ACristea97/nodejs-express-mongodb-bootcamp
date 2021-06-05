const mongoose = require('mongoose');
const dotenv = require('dotenv');

/* Config env should be read before requiring the app file
 * in order for them to be available in the app.js file at file read.
 */
dotenv.config({
    path: './config.env'
});

const app = require('./app.js');

const {
    logger,
    createLoggingMessage,

    LoggingCodes
} = require('./logger.js');

const {
    DATABASE_NAME: databaseName,
    DATABASE_USER: databaseUser,
    DATABASE_PASSWORD: databasePassword,

    PORT: port
} = process.env;

let databaseURI = process.env.DATABASE_CONNECTION_STRING.replace('<DATABASE_NAME>', databaseName);
databaseURI = databaseURI.replace('<USER>', databaseUser);
databaseURI = databaseURI.replace('<PASSWORD>', databasePassword);

mongoose.connect(databaseURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    logger.debug(
        createLoggingMessage(LoggingCodes.DATABASE_CONNECTED)
    );
});

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
