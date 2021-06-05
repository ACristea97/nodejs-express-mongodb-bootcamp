const {
    logger,
    createLoggingMessage,

    LoggingCodes
} = require('../logger.js');

const Tour = require('../models/ToursModel.js');
const resourceName = 'tour';

const AbstractController = require('./AbstractController.js');

class ToursController extends AbstractController{
    constructor () {
        super('tours');
    }

    /**
     * @override
     */
    async create(request, response) {

        try {
            const tour = await Tour.create(request.body);

            logger.debug(
                createLoggingMessage(LoggingCodes.CREATED_RESOURCE, resourceName)
            );

            response.status(201).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: {
                    tour
                }
            });

        } catch (error) {
            logger.error(error);

            response.status(400).json({
                status: 'failure',
                requestedAt: request.requestTime,
                message: error.message
            });
        }

    }

    /**
     * @override
     */
    async read(request, response) {

        try {

            // Build the query
            const filters = {};

            for (const { by, operation, value } of request.query.filter) {
                if (!by || !operation || !value)
                    continue;

                if (operation === 'equals')
                    filters[by] = value;
                else
                    filters[by] = {
                        [`$${operation}`]: value
                    }
            }

            const query = Tour.find(filters);

            // const tours = await Tour.find().where('property').equals(value)

            // Execute query
            const tours = await query;

            logger.debug(
                createLoggingMessage(LoggingCodes.READ_RESOURCE, resourceName)
            );

            response.status(200).json({
                status: 'success',
                requestedAt: request.requestTime,
                results: tours.length,
                data: {
                    tours
                }
            });

        } catch (error) {
            logger.error(error);

            response.status(404).json({
                status: 'failure',
                requestedAt: request.requestTime,
                message: error.message
            });
        }

    }

    /**
     * @override
     */
    async readById(request, response) {

        try {
            // Tour.findOne({ _id: request.params.id });
            const tour = await Tour.findById(request.params.id);

            logger.debug(
                createLoggingMessage(LoggingCodes.READ_BY_ID_RESOURCE, resourceName)
            );

            response.status(200).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: {
                    tour
                }
            });

        } catch (error) {
            logger.error(error);

            response.status(404).json({
                status: 'failure',
                requestedAt: request.requestTime,
                message: error.message
            });
        }

    }

    /**
     * @override
     */
    async update(request, response) {

        try {
            const tour = await Tour.findByIdAndUpdate(request.params.id, request.body, {
                new: true,
                runValidators: true
            });

            logger.debug(
                createLoggingMessage(LoggingCodes.UPDATE_RESOURCE, resourceName)
            );

            response.status(200).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: {
                    tour
                }
            });

        } catch (error) {
            logger.error(error);

            response.status(404).json({
                status: 'failure',
                requestedAt: request.requestTime,
                message: error.message
            });
        }

    }

    /**
     * @override
     */
    async delete(request, response) {

        try {
            await Tour.findByIdAndDelete(request.params.id);

            logger.debug(
                createLoggingMessage(LoggingCodes.DELETE_RESOURCE, resourceName)
            );

            response.status(204).json({
                status: 'success',
                requestedAt: request.requestTime,
                data: null
            });

        } catch (error) {
            logger.error(error);

            response.status(404).json({
                status: 'failure',
                requestedAt: request.requestTime,
                message: error.message
            });
        }

    }
}

module.exports = ToursController;
