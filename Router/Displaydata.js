const express = require("express");
const router = express.Router();
const Products = require("../models/Products");

router.post("/productdata", async (req, res) => {
  try {
    const products = await Products.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/get/:getId", async (req, res) => {
  try {
    const getId = req.params.getId;
    const product = await Products.findOne({ id: getId });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

