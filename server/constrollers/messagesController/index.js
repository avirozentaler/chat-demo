const messages = require('../../db/messages')
const date = new Date(); 

const getMessages = (req, res) => {
    try {
        const currentTime = data.toLocaleTimeString();
        const { id } = req.params;
        const result = messages.filter((item)=>{
           return item.roomId.toString() === id
        })
        console.log(result)
        res.status(200).send(result)    ;
    }
    catch (err) {
        (err) => res.status(400).send(err);
    }
}

const addMessage = (req, res) => {

    console.log(req.body.data)

    try {
        
        // messages.push({id,roomId,time:currentTime,data})
       
        res.status(200).send('message added');
    }
    catch (err) {
        (err) => {
            console.log('error')
            res.status(400).send(err);
        }
    }
}

module.exports = {
    getMessages,
    addMessage,

}