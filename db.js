const mongoose = require('mongoose');

require("dotenv").config();

const mongoURL = process.env.DATABASE;

const mongoDB = async () => {
    try {
      await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("Connected to MongoDB");
  
      const fetched_data = await mongoose.connection.db.collection("productdata");
    //   console.log("Fetching data...");
      const data = await fetched_data.find().toArray();
        global.food_items = data
        // console.log(global.food_items);
    } catch (err) {
      console.error("Error not connecting to MongoDB:", err);
    }
  }


module.exports = mongoDB;