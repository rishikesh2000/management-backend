const usersController = require('../controllers/users')
const express= require('express');
const Router=express.Router();
const { verifyToken } = require('../config/tokenConfig');


Router.post('/addUser',verifyToken,usersController.addUser);
Router.delete('/removeUser/:userID',verifyToken,usersController.removeUser);
Router.get('/allUsers',verifyToken,usersController.getAllUser);
Router.put('/updateUsers/:userID',verifyToken,usersController.updateUser);
Router.get('/getUsers/:suserID',verifyToken,usersController.getUser);





module.exports=Router;