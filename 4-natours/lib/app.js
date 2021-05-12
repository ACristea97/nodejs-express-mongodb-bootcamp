const express = require('express');
const morgan = require('morgan');

const mountRouters = require('./utils.js');

const app = express();

/* GENERAL EXECUTED Middleware stack
*
* Usually defined at the top of the file or, more specifically,
* BEFORE THE ROUTE MIDDLEWARE IS DEFINED. This needs to be enforced
* because the place a middleware is defined is exactly the place where
* it will be placed in the Middleware Stack. For example if we were to
* define this middleware before defining some routes' middleware,
* THE ROUTE MIDDLEWARE WILL BE EXECUTED FIRST. Furthermore, if that
* route's middleware responds/doesn't call the next function,
* THE MIDDLEWARE DEFINED AFTER IT will not even be executed.
* */
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(express.json());
app.use((request, response, next) => {
    request.requestTime = new Date().toISOString();

    /* DON'T FORGET TO CALL THE NEXT MIDDLEWARE OR THE MIDDLEWARE STACK WILL BE BLOCKED. */
    next();
});

/* ROUTE DEPENDENT MIDDLEWARES */
mountRouters(app);

module.exports = app;
