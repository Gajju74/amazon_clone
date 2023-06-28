const express = require('express')
const app = express()
const cors = require("cors");
const mongoDB = require("./db")
mongoDB();
const PORT = process.env.PORT || 8000

const DefaultData = require("./Defaultdata");

app.get('/', function(req, res) {
  res.send('hello world')
})

app.use(cors());
app.use(express.json());

app.use('/api', require("./Router/Displaydata"))
app.use('/api', require("./Router/CreateUser"))
app.use('/api', require("./Router/OrderAddress"))
app.use('/api', require("./Router/Orderdata"))

app.listen(PORT, function(req, res) {
    console.log(`Server start at port no ${PORT}`);
});


DefaultData();