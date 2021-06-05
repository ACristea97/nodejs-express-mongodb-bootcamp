class AbstractController {
    constructor (resourceName) {
        this.routes = {
            RESOURCES: `/api/v1/${resourceName}`,
            ROOT: '/',
            AT_ID: '/:id'
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

module.exports = AbstractController;
