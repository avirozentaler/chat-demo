const {Router} = require('express');
const routerMessages = Router();
const {addMessage,getMessages}= require('../../constrollers/messagesController')





routerMessages.get('/get-messages/:id',getMessages);
routerMessages.post('/add-message',addMessage);



module.exports= routerMessages;