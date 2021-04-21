const fs = require('fs');
const path = require('path');

const AbstractResourceApi = require('./AbstractResourceApi.js');

const DATA_PATH = path.join(`${__dirname}`, '../dev-data/data/tours-simple.json');
let tours = JSON.parse(fs.readFileSync(DATA_PATH));

class ToursApi extends AbstractResourceApi{
    constructor () {
        super('tours');
    }

    /**
     * @override
     */
    create(request, response) {
        const newTour = Object.assign({ id: tours.length }, request.body);
        tours.push(newTour);

        fs.writeFile(DATA_PATH, JSON.stringify(tours), (error) => {
            if (error)
                return console.log(error.message);

            response.status(201).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: {
                    tour: newTour
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
            results: tours.length,
            data: { tours }
        });
    }

    /**
     * @override
     */
    readById(request, response) {
        const id = request.params.id * 1;
        const tour = tours.find(element => element.id === id);

        if (!tour)
            return response.status(404).json({
                status: 'fail',
                requestedAt: request.requestTime,
                message: 'Invalid Resource Id.'
            });

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
            return this.#updatePartially;
        else if (httpMethod === 'PUT')
            return this.#updateFully;
    }

    #updatePartially(request, response) {
        const id = request.params.id * 1;
        const propertiesToUpdate = request.body;

        if (id > tours.length || id < 0)
            return response.status(404).json({
                status: 'fail',
                requestedAt: request.requestTime,
                message: 'Invalid Resource Id.'
            });

        const propertiesArrays = Object.entries(propertiesToUpdate);
        for (const [property, value] of propertiesArrays)
            if (property in tours[id])
                tours[id][property] = value;
            else
                return response.status(404).json({
                    status: 'fail',
                    requestedAt: request.requestTime,
                    message: `Inexistent property: ${property} provided.`
                });

        fs.writeFile(DATA_PATH, JSON.stringify(tours), (error) => {
            if (error)
                return console.log(error.message);

            response.status(200).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: {
                    tour: tours[id]
                }
            });
        });
    }

    #updateFully(request, response) {
        const id = request.params.id * 1;
        const updatedTour = request.body;

        if (id > tours.length || id < 0)
            return response.status(404).json({
                status: 'fail',
                requestedAt: request.requestTime,
                message: 'Invalid Resource Id.'
            });

        tours[id] = { id, ...updatedTour };

        fs.writeFile(DATA_PATH, JSON.stringify(tours), (error) => {
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

        if (id > tours.length || id < 0)
            return response.status(404).json({
                status: 'fail',
                requestedAt: request.requestTime,
                message: 'Invalid Resource Id.'
            });

        const prevToursLength = tours.length;
        tours = tours.filter((element) => element.id !== id );

        if (prevToursLength === tours.length)
            return response.status(404).json({
                status: 'fail',
                requestedAt: request.requestTime,
                message: 'No Resource Deleted.'
            });

        fs.writeFile(DATA_PATH, JSON.stringify(tours), (error) => {
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

module.exports = ToursApi;
