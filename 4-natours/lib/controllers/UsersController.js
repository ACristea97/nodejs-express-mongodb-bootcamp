const AbstractController = require('./AbstractController.js');

class UsersController extends AbstractController{
    constructor () {
        super('users');
    }
}

module.exports = UsersController;
