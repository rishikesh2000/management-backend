const superUser = require('../controllers/SuperLogin')
const express= require('express');
const Router=express.Router();
const { verifyToken } = require('../config/tokenConfig');


Router.post('/superUserReguster',superUser.superUserRegister);
Router.post('/superUserLogin',superUser.superLogin);
Router.get('/getSuperUser',verifyToken,superUser.getLoggedInUser);


module.exports=Router;