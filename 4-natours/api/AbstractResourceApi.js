class AbstractResourceApi {
    constructor (resourceName) {
        this.routes = {
            RESOURCES: `/api/v1/${resourceName}`,
            RESOURCE_AT_ID: `/api/v1/${resourceName}/:id`
        };
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
}

module.exports = AbstractResourceApi;