const AbstractResourceApi = require('./AbstractResourceApi.js');

class UsersApi extends AbstractResourceApi{
    constructor () {
        super('users');
    }
}

module.exports = UsersApi;
