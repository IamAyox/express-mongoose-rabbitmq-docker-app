let express = require("express");
let app = express();
const PORT = 3002;
let Commande = require("./models/Commande");
let mongoose = require("mongoose");
let axios = require("axios");
let isAuthenticated = require("./isAuthenticated");
const PublishCommande = require("./PublishCommande");

mongoose.connect("mongodb://127.0.0.1:27017/commande-db")
.then(res=>console.log("commandes server is connected to mongodb server "))
.catch(err=>console.log(err))

app.use(express.json());
app.use(isAuthenticated);
app.listen(PORT,()=>console.log(`commandes server listening on port ${PORT}`));

const handleRequest = async  (ids,authHeader)=>{
    let response = await axios.post("http://localhost:3003/products/buy",{ids},{headers:{"content-type":"application/json",...authHeader}})
    return response.data.reduce((total,current)=> total + current.price,0)
}
app.post("/commandes",async(req,res)=>{
    let {products,user_email} = req.body;
    let total = await handleRequest(products,{'Authorization' : req.headers.authorization});

    Commande.create({products,user_email,total_price:total})
    .then(result=>{
        
        res.json({msg:"commande created",result})
        PublishCommande(req.user,products);
    })
    .catch(err=>res.status(400).json(err))
})

