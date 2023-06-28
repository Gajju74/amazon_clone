const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddressSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  fname: {
    type: String,
    required: true
  },
  mobile: {
    type: Number,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Address", AddressSchema);
