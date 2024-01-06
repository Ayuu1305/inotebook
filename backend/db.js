const mongoose = require("mongoose");
const mongoUrl = "mongodb://localhost:27017/inotebook";

const connectToMongo = () => {
  mongoose.connect(mongoUrl)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};

module.exports = connectToMongo;
