// Demo data
let users = require("../models/User")

// let users = [
//     {
//         id: 1,
//         title: 'This is an experiment'
//     },
//     {
//         id: 2,
//         title: 'Fastify is pretty cool'
//     },
//     {
//         id: 3,
//         title: 'Just another user, yea!'
//     }
// ]

// Handlers
const getAllUsers = async (req, reply) => {
    const user =await  users.find()
    return user
}

const getUser = async (req, reply) => {
    const id =req.params.id // user ID
    console.log(id);
    const user =await  users.findOne({_id:id})
    return user
}

const addUser = async (req, reply) => {
    console.log(req.body);
    try {
        const  user = await users.insertMany(req.body)
    return user

    } catch (error) {
        console.log(error);
    }

    // users.push(newUser)
}

const updateUser = async (req, reply) => {
    const filter = {_id:req.params.id}
    // const str = CircularJSON.stringify(req.body);
    // JSON.parse(str)
    let user =await users.findOneAndUpdate(filter, req.body, {
        new: true,
        upsert: true // Make this update into an upsert
      })

    return {
        user   
    }
}

const deleteUser = async (req, reply) => {
    const id =req.params.id

    let user =await users.findByIdAndDelete({_id:id})
    return { msg: `${user} with ID ${id} is deleted` }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}
