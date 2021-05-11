const express = require('express');

const ToursController = require('./controllers/ToursController.js');
const UsersController = require('./controllers/UsersController.js');

const controllers = [ToursController, UsersController];

function mountRouterMiddleware(application, ResourceController) {
    const router = express.Router();
    const resourceController = new ResourceController();

    const createResource = resourceController.create.bind(resourceController);
    const readResource = resourceController.read.bind(resourceController);
    const readResourceById = resourceController.readById.bind(resourceController);
    const patchUpdateResource = resourceController.update('PATCH').bind(resourceController);
    const putUpdateResource = resourceController.update('PUT').bind(resourceController);
    const deleteResource = resourceController.delete.bind(resourceController);

    const validateBody = resourceController.validateBody.bind(resourceController);
    const validateId = resourceController.validateId.bind(resourceController);

    application.use(resourceController.routes.RESOURCES, router);

    router.route(resourceController.routes.ROOT)
        .post(validateBody, createResource)
        .get(readResource);

    router.param('id', validateId);

    router.route(resourceController.routes.AT_ID)
        .get(readResourceById)
        .patch(patchUpdateResource)
        .put(validateBody, putUpdateResource)
        .delete(deleteResource);
}

function mountRouters(application) {
    for (const controller of controllers)
        mountRouterMiddleware(application, controller);
}

module.exports = mountRouters;
