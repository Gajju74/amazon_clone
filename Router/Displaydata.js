const express = require("express");
const router = express.Router()


router.post("/productdata", (req, res)=>{
    try {
        // console.log(global.food_items);
        res.json(global.food_items)
    } catch (error) {
        confirm.error(error.message);
        res.send("Server Error")
    }
})

router.get("/get/:getId", (req, res) => {
    try {
      const getId = req.params.getId;
      const post = global.food_items.find(item => item.id === getId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });
  
  
  


module.exports = router;