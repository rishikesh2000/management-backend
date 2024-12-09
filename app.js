const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors')

dotenv.config();  
require('./config/dbConfig');
const app = express();
app.use(express.json());
app.use(cors());

const adduserRoute = require('./views/usersView')
const superUserRoute = require('./views/superUserView')

const port = parseInt(process.env.PORT);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

app.use('/', adduserRoute);
app.use('/', superUserRoute);


/// server

app.listen(port,(err)=>{

    if(err){
        console.log("server not connected", err)
    }else{
        console.log(`server running at ${port}`)
    }
})