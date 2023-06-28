const mongoose = require('mongoose');

require("dotenv").config();

const mongoURL = process.env.DATABASE;

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("Error not connecting to MongoDB:", err);
    }
  }


module.exports = mongoDB;