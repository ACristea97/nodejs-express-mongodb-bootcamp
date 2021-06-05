const fs = require('fs');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('../../lib/models/ToursModel.js');
const { logger, createLoggingMessage, LoggingCodes } = require('../../lib/logger.js');

/* Config env should be read before requiring the app file
 * in order for them to be available in the app.js file at file read.
 */
dotenv.config({
    path: './config.env'
});

const {
    DATABASE_NAME: databaseName,
    DATABASE_USER: databaseUser,
    DATABASE_PASSWORD: databasePassword,

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

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Import data into DB
const importData = async () => {

    try {

        await Tour.create(tours);

        logger.debug(createLoggingMessage(LoggingCodes.CREATED_RESOURCE, 'tour'));

    } catch (error) {

        logger.error(error);

    }

    process.exit();

};

// Delete all data from Collection
const deleteData = async () => {

    try {

        await Tour.deleteMany();

        logger.debug(createLoggingMessage(LoggingCodes.DELETE_RESOURCE, 'tour'));

    } catch (error) {

        logger.error(error);

    }

    process.exit();

};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}
