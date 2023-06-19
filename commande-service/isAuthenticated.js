const jwt = require('jsonwebtoken');

const isAuthenticated = async (req,res,next) =>{
  const token = req.headers.authorization.split(' ')[1];
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
}
module.exports = isAuthenticated;