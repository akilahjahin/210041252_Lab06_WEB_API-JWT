const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Successfully!");
    } catch (err) {
        console.error("Connection Failed to MOngoDB..... :  \n      ", err);
        process.exit(1);
    }

};

module.exports = connectDB;
