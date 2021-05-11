const fs = require('fs');

const AbstractResourceApi = require('./AbstractController.js');

const tourSchema = {
    name: {
        required: true,
        type: 'string'
    },
    maxGroupSize: {
        required: false,
        type: 'number'
    },
    duration: {
        required: true,
        type: 'number'
    },
    difficulty: {
        required: true,
        type: 'string'
    },
    ratingsAverage: {
        required: false,
        type: 'number'
    },
    ratingsQuantity: {
        required: false,
        type: 'number'
    },
    price: {
        required: true,
        type: 'number'
    },
    summary: {
        required: true,
        type: 'string'
    },
    description: {
        required: true,
        type: 'string'
    },
    imageCover: {
        required: false,
        type: 'string'
    },
    images: {
        required: false,
        type: 'Array<string>'
    },
    startDates: {
        required: false,
        type: 'Array<string>'
    }
};

class ToursController extends AbstractResourceApi{
    constructor () {
        super('tours', tourSchema);
    }

    /**
     * @override
     */
    create(request, response) {
        const id = this.resources.size;
        const tour = Object.assign({ id }, request.body);
        this.resources.set(id, tour);

        fs.writeFile(this.dataPath, JSON.stringify(Array.from(this.resources.values())), (error) => {
            if (error)
                return console.log(error.message);

            response.status(201).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: {
                    tour
                }
            });
        });
    }

    /**
     * @override
     */
    read(request, response) {
        response.status(200).json({
            status: 'success',
            requestedAt: request.requestTime,
            results: this.resources.size,
            data: { tours: Array.from(this.resources.values()) }
        });
    }

    /**
     * @override
     */
    readById(request, response) {
        const id = request.params.id * 1;
        const tour = this.resources.get(id);

        response.status(200).json({
            status: 'success',
            requestedAt: request.requestTime,
            data: {
                tour
            }
        });
    }

    /**
     * @override
     */
    update(httpMethod) {
        if (httpMethod === 'PATCH')
            return this.#updatePartially.bind(this);
        else if (httpMethod === 'PUT')
            return this.#updateFully.bind(this);
    }

    #updatePartially(request, response) {
        const id = request.params.id * 1;
        const tour = this.resources.get(id);

        const propertiesToUpdate = request.body;

        const propertiesArrays = Object.entries(propertiesToUpdate);
        for (const [property, value] of propertiesArrays)
            if (property in tour)
                tour[property] = value;
            else
                return response.status(404).json({
                    status: 'fail',
                    requestedAt: request.requestTime,
                    message: `Property: ${property} doesn't exist.`
                });

        this.resources.set(id, tour);

        fs.writeFile(this.dataPath, JSON.stringify(Array.from(this.resources.values())), (error) => {
            if (error)
                return console.log(error.message);

            response.status(200).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: {
                    tour
                }
            });
        });
    }

    #updateFully(request, response) {
        const id = request.params.id * 1;
        const updatedTour = request.body;

        this.resources.set(id, { id, ...updatedTour });

        fs.writeFile(this.dataPath, JSON.stringify(Array.from(this.resources.values())), (error) => {
            if (error)
                return console.log(error.message);

            response.status(200).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: {
                    tour: updatedTour
                }
            });
        });
    }

    /**
     * @override
     */
    delete(request, response) {
        const id = request.params.id * 1;

        if (!this.resources.delete(id))
            return response.status(404).json({
                status: 'fail',
                requestedAt: request.requestTime,
                message: 'No Resource Deleted.'
            });

        fs.writeFile(this.dataPath, JSON.stringify(Array.from(this.resources.values())), (error) => {
            if (error)
                return console.log(error.message);

            response.status(200).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: `${id}`
            });
        });
    }
}

module.exports = ToursController;
