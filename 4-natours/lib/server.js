const dotenv = require('dotenv');

/* Config env should be read before requiring the app file
 * in order for them to be available in the app.js file at file read.
 */
dotenv.config({
    path: './config.env'
});

const app = require('./app.js');

const { port } = process.env;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
