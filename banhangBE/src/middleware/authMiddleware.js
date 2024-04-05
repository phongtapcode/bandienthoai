const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const  authMiddleware = (req,res,next)=>{
    const token = req.headers.token.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN,function (err,user){
        if(err){
            return res.status(404).json({
                status: "ERR",
                message: "The auth"
            }) 
        }

        if(user?.isAdmin){
            next();
        }else{
            return res.status(404).json({
                status: "ERR",
                message: "The auth"
            })
        }
    })
}

const  authUserMiddleware = (req,res,next)=>{
    const token = req.headers.token.split(" ")[1];
    const userId = req.params.id;

    jwt.verify(token,process.env.ACCESS_TOKEN,function (err,user){
        if(err){
            return res.status(404).json({
                status: "ERR",
                message: "Lỗi Token"
            })
        }
        
        if(user?.isAdmin || user?.id === userId){
            next();
        }else{
            return res.status(404).json({
                status: "ERR",
                message: "The auth"
            })
        }
    })
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}