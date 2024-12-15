const mongoose = require('mongoose');

mongoose.connect( process.env.MongoURL, { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log("Database error:", err);
});
