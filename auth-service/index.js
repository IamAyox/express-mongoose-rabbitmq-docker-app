let express = require("express");
let app = express();
const PORT = 3001;
let User = require("./models/User");
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserConsumer = require('./UserConsumer');

mongoose.connect("mongodb://127.0.0.1:27017/auth-db")
.then(res=>console.log("auth server is connected to mongodb server "))
.catch(err=>console.log(err))

UserConsumer();
app.use(express.json());
app.listen(PORT,()=>console.log(`auth server listening on port ${PORT}`));

app.post('/users/register', async (req, res) => {

    try {
        const { name, email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json("Email already exists! Please use a unique email.");
      }
  
      const hash = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hash,
      });
  
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  });

  app.post('/users/login', async(req,res)=>{
    const {email,password} = req.body;
    let user = await User.findOne({email:email})

    if(!user){
        res.status(400).json({ error: "The provided email doesn't exist in our user database. Consider signing up!" })
    }
    else{
        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign({name:user.name,email:user.email},'authToken',{expiresIn:"2h"});
            res.json({token,user})
        }else{
            res.status(400).json("wrong pwd !")
        }
    }
    
})
  
// app.post('/users/register',async(req,res)=>{
//     let {name,email,password} = req.body
//     User.findOne({email:email})
//     .then(user=>{
//         if(user){
//             res.status(400).json("email already exists ! please use a unique email !")
//         }
//         console.log("user doesn't exist")
//         bcrypt.hash(password,10)
//         .then(hash=>{
//             console.log(hash)
//             let newUser = new User({
//                 name,
//                 email,
//                 password : hash
//             })
//             newUser.save()
//             .then(user=>res.json(user))
//             .catch(err=>res.status(400).json(err))
//         }).catch(err=>res.status(400).json(err))
//         })
//     .catch(err=>res.status(400).json(err))
// })


  
