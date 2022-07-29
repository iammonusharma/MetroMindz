const userController = require('../controller/Users');

// Validation schema for blogs
const getUserValidation = {
        params: {
            id: { type: 'string' } // Try changing to object to see error
        }, 
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' }
                }
            }
        }
}

const addUserValidation = {
    body: {
        type: 'object',
        additionalProperties: false,
        required: [
            // 'id',
            'name','email','username','phone','image',
            'gender'
        ],
        properties: {
            // id: { type: 'number' },
            name: { type: 'string' },
            age: { type: 'number' },
            email: { type: 'string' },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                name: { type: 'string' }
            }
        }
    }
}

const routes = [{
        method: 'GET',
        url: '/api/users',
        handler: userController.getAllUsers
    },
    {
        method: 'GET',
        url: '/api/users/:id',
        // schema: getUserValidation, // add validation
        handler: userController.getUser
    },
    {
        method: 'POST',
        url: '/api/users',
     // schema: addUserValidation, // add validation
        handler: userController.addUser
    },
    {
        method: 'PUT',
        url: '/api/users/:id',
        handler: userController.updateUser
    },
    {
        method: 'DELETE',
        url: '/api/users/:id',
        handler: userController.deleteUser
    }
]
module.exports = routes