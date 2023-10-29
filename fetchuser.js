const JWT = require('jsonwebtoken');
const JWT_secret = "iNotebook's server";



const fetchuser = async (req,res,next)=>{

    
    const authToken = req.header('authToken');
    if(!authToken)
    {return res.status(400).json({"error":"Please provide auth Token"});
    }
    const userId = JWT.verify(authToken, JWT_secret) ;
    // console.log(userId);
    req.user= userId;
    next();



}

module.exports = fetchuser;