const express = require('express');

const ToursController = require('./controllers/ToursController.js');
const UsersController = require('./controllers/UsersController.js');

const controllers = [ToursController, UsersController];

function mountRouterMiddleware(application, ResourceController) {
    const router = express.Router();
    const resourceController = new ResourceController();

    application.use(resourceController.routes.RESOURCES, router);

    router.route(resourceController.routes.ROOT)
        .post(resourceController.create)
        .get(resourceController.read);

    router.route(resourceController.routes.AT_ID)
        .get(resourceController.readById)
        .patch(resourceController.update)
        .put(resourceController.update)
        .delete(resourceController.delete);
}

function mountRouters(application) {
    for (const controller of controllers)
        mountRouterMiddleware(application, controller);
}

module.exports = mountRouters;
