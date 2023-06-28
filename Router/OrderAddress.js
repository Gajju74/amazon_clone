const express = require("express");
const router = express.Router();
const Orderaddres = require("../models/Address");

router.post("/orderaddress", async (req, res) => {
  try {
    const address = new Orderaddres({
      email: req.body.email,
      fname: req.body.fname,
      mobile: req.body.mobile,
      pincode: req.body.pincode,
      address: req.body.address,
      area: req.body.area,
      city: req.body.city,
      state: req.body.state,
    });

    await address.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});


router.get("/getaddress", async (req, res) => {
  try {
    const { email } = req.query;
    // console.log("Email:", email);
    const data = await Orderaddres.find({ email }); // Find all documents with the matching email
    // console.log("Data:", data);
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No addresses found' });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/getaddressId", async (req, res) => {
  try {
    const { addressId } = req.body;
    const data = await Orderaddres.findById(addressId);
    if (!data) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.get("/getaddress/:getaddressId", async (req, res) => {
  try {
    const dataId = req.params.getaddressId;
    const data = await Orderaddres.findById(dataId);
    if (!data) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.put("/updateaddress/:id", async (req, res) => {
  try {
    const updatedData = await Orderaddres.findByIdAndUpdate(
      req.params.id,
      {
        // email: req.body.email,
        fname: req.body.fname,
        mobile: req.body.mobile,
        pincode: req.body.pincode,
        address: req.body.address,
        area: req.body.area,
        city: req.body.city,
        state: req.body.state,
      },
      { new: true } // Use { new: true } to return the updated document
    );
    if (!updatedData) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(updatedData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});




module.exports = router;
