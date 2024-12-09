const mongoose = require('mongoose');

const URl = process.env.URl;

mongoose.connect(URl, { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log("Database error:", err);
});
