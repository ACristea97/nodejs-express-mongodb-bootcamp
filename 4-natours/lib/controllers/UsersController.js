const AbstractResourceApi = require('./AbstractController.js');

const userSchema = {

};

class UsersController extends AbstractResourceApi{
    constructor () {
        super('users', userSchema);
    }
}

module.exports = UsersController;
