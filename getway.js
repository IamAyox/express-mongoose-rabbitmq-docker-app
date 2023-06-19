let express = require('express');
let app = express();
let axios = require('axios');
require('dotenv').config()

app.listen(process.env.PORT,()=>console.log(`gateway server listening on port ${process.env.PORT}`))

app.post('/users/register', async (req, res) => {
        const { name, email, password } = req.body;
        axios.post(process.env.REGISTER_URL,{ name, email, password },{
            headers:{
                
            }
        }).then(result => res.json(result))
        .catch(err=>res.json({error:err}))
  });

  app.post('/users/login', async(req,res)=>{
    const {email,password} = req.body;
    axios.post(process.env.LOGIN_URL,{email,password},{
        headers:{
            
        }
    }).then(result => res.json(result))
    .catch(err=>res.json({error:err}))
    
})

app.post('/products',async (req,res)=>{
    let {name,description,price} = req.body;
    let token = req.headers.authorization.split(' ')[1]
    axios.post(process.env.POST_PRODUCT_URL,{name,description,price},{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    }).then(result => res.json(result))
    .catch(err=>res.json({error:err}))
})

app.post('/products/buy',async (req,res,next) =>{
    console.log(req.body)
    let token = req.headers.authorization.split(' ')[1]
    axios.post(process.env.GET_PRODUCTS_URL,{ids:ids},{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    }).then(result => res.json(result))
    .catch(err=>res.json({error:err}))
})

app.post("/commandes",async(req,res)=>{
    let {products,user_email} = req.body;
    axios.post(process.env.POST_COMMANDE_URL,{products,user_email},{
        headers:{
            'Authorization' : `Bearer ${token}`
        }
    }).then(result => res.json(result))
    .catch(err=>res.json({error:err}))
})