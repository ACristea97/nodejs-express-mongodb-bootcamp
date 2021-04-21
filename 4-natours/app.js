const express = require('express');
const morgan = require('morgan');

const ToursApi = require('./api/ToursApi.js');
const UsersApi = require('./api/UsersApi.js');

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
app.use(morgan('dev'));
app.use(express.json());
app.use((request, response, next) => {
    request.requestTime = new Date().toISOString();

    /* DON'T FORGET TO CALL THE NEXT MIDDLEWARE OR THE MIDDLEWARE STACK WILL BE BLOCKED. */
    next();
});

const port = 3000;

/* ROUTE DEPENDENT MIDDLEWARES */

// Tours API
const toursApi = new ToursApi();
app.route(toursApi.routes.RESOURCES)
    .post(toursApi.create)
    .get(toursApi.read);

app.route(toursApi.routes.RESOURCE_AT_ID)
    .get(toursApi.readById)
    .patch(toursApi.update('PATCH'))
    .put(toursApi.update('PUT'))
    .delete(toursApi.delete);

// Users API
const userApi = new UsersApi();
app.route(userApi.routes.RESOURCES)
    .post(userApi.create)
    .get(userApi.read);

app.route(userApi.routes.RESOURCE_AT_ID)
    .get(userApi.readById)
    .patch(userApi.update('PATCH'))
    .put(userApi.update('PUT'))
    .delete(userApi.delete);

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
