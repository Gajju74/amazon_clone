const productdata = require("../productData/productdata");
const Products = require("./models/Products");

const DefaultData = async()=>{
    try {
        await Products.deleteMany({});
        const storeData = await Products.insertMany(productdata);
        // console.log(storeData);
    } catch (error) {
        console.log("error" + error.message);
    }
};

module.exports = DefaultData;