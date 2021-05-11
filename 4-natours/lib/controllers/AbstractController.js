const fs = require('fs');
const path = require('path');

const validate = require('./validator.js');

class AbstractController {
    constructor (resourceName, schema) {
        this.dataPath = path.join(`${__dirname}`, `../../dev-data/data/${resourceName}.json`);
        this.routes = {
            RESOURCES: `/api/v1/${resourceName}`,
            ROOT: '/',
            AT_ID: '/:id'
        };
        this.schema = schema;
        this.resources = new Map();

        const resourceCollection = JSON.parse(fs.readFileSync(this.dataPath));
        for (const resource of resourceCollection)
            this.resources.set(resource.id, resource);
    }

    create(request, response) {
        response.status(500).json({
            status: 'error',
            message: 'This route is not defined.'
        });
    }

    read(request, response) {
        response.status(500).json({
            status: 'error',
            message: 'This route is not defined.'
        });
    }

    readById(request, response) {
        response.status(500).json({
            status: 'error',
            message: 'This route is not defined.'
        });
    }

    update(httpMethod) {
        if (httpMethod === 'PATCH' || httpMethod === 'PUT')
            return (request, response) => response.status(500).json({
                status: 'error',
                message: 'This route is not defined.'
            });
    }

    delete(request, response) {
        response.status(500).json({
            status: 'error',
            message: 'This route is not defined.'
        });
    }

    validateId(request, response, next, id) {
        if (id > this.resources.length || id < 0
            || !(this.resources.find(elem => elem.id === id)))
            return response.status(404).json({
                status: 'fail',
                requestedAt: request.requestTime,
                message: 'Invalid Resource Id.'
            });

        next();
    }

    validateBody(request, response, next) {
        const id = request.params.id * 1;
        const resource = id ? this.resources.get(id) : request.body;

        if(!validate(resource, this.schema))
            return response.status(400).json({
                status: 'fail',
                requestedAt: request.requestTime,
                message: 'Invalid Resource Format.'
            });

        next();
    }
}

module.exports = AbstractController;
