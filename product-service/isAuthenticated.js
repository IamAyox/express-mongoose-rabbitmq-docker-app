const jwt = require('jsonwebtoken');

const isAuthenticated = async (req,res,next) =>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if(!token) res.status(400).json({error:"no token found "})
    else{
      jwt.verify(token,'authToken',(err,user)=>{
        if(err) res.status(400).json({err})
        else{
          req.user = user;
          console.log(req);
          next();
        }
      })
    }
  }catch(error){
    return res.status(404).json(err)
  }
}
module.exports = isAuthenticated;