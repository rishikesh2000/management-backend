const mongoose = require('mongoose');

const URl = process.env.URl;

mongoose.connect(URl)
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log("Database error:", err);
});
