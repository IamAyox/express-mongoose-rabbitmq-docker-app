let express = require("express");
let app = express();
const PORT = 3003;
let Product = require("./models/Product");
let mongoose = require("mongoose");
let isAuthenticated = require("./isAuthenticated")
let ProductConsumer = require('./ProductConsumer');

mongoose.connect("mongodb://127.0.0.1:27017/product-db")
.then(res=>console.log("products server is connected to mongodb server "))
.catch(err=>console.log(err))

app.use(express.json());
app.use(isAuthenticated);
ProductConsumer();
app.listen(PORT,()=>console.log(`product server listening on port ${PORT}`));

app.post('/products',async (req,res,next)=>{
    let {name,description,price} = req.body;
    Product.create({name,description,price})
    .then(result=>res.json(result))
    .catch(err=>res.json({error:err}))
})

app.post('/products/buy',async (req,res,next) =>{
    console.log(req.body)
    let products = await Product.find({_id :{$in : req.body.ids}});
    res.json(products);
})