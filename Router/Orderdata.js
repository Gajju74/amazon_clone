const express = require("express");
const router = express.Router()
const orderdata = require("../models/Order")


router.post("/orderdata", async(req, res) => {
    const data = req.body.order_data
    const emailID = await orderdata.findOne({'email': req.body.email})
    console.log(emailID);
    if (emailID === null) {
        try {
            await orderdata.create({
                email: req.body.email,
                order_data : [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }      
    }
    else {
        try {
            await orderdata.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})


router.post('/myOrderData', async (req, res) => {
    try {
        // console.log(req.body.email)
        let eId = await orderdata.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }   
});

  
router.delete("/deleteOrder", async (req, res) => {
    const { email, addressId } = req.body;
  
    try {
      const order = await orderdata.findOne({ email });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      const orderData = order.order_data;
      let orderDeleted = false;
  
      for (let i = 0; i < orderData.length; i++) {
        const orderItem = orderData[i];  //i means index
        const foundOrderItem = orderItem.find(item => item.addressId === addressId);
        if (foundOrderItem) {
          orderData.splice(i, 1); // Delete the item at index i
          orderDeleted = true;
          break;
        }
      }
  
      if (!orderDeleted) {
        return res.status(404).json({ error: "Order item not found" });
      }
  
      await order.save();
  
      res.json({ success: true });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error");
    }
  });
  
  




module.exports = router;