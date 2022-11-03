
const {Router} = require('express');
const routerUsers = Router();
const {getUsers,getSingleUser}= require('../../constrollers/usersController')






routerUsers.get('/get-users',getUsers);
routerUsers.post('/get-single-users',getSingleUser);


module.exports= routerUsers;