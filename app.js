const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();  

require('./config/dbConfig');

const app = express();

app.use(cors()); 
app.use(express.json()); 

const adduserRoute = require('./views/usersView');
const superUserRoute = require('./views/superUserView');

const port = parseInt(process.env.PORT);

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use('/users', adduserRoute); 
app.use('/superuser', superUserRoute); 

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, (err) => {
    if (err) {
        console.error("Server failed to start:", err);
    } else {
        console.log(`Server running`);
    }
});




