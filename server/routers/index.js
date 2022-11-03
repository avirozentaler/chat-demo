const routerUsers = require('./userRouter');
const routerMessages = require('./messagesRouter');
const {Router} = require('express');
const router = Router();




router.use('/users',routerUsers);
router.use('/messages',routerMessages);




module.exports =router;