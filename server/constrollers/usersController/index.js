
const users =require('../../db/users');

const getUsers =(req,res)=>{
 res.send(users);

}


const getSingleUser =(req,res)=>{
    console.log(users);
    res.send(users);
   
   }
   


module.exports={
    getUsers,
    getSingleUser,

}