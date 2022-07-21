const jwt = require("jsonwebtoken")
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.header('token');
    if (!token){
        return res.status(403).json("not authorized")
    }
try{
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user = verify.user;
    next();
    }catch(err){
        console.log(err.message);
    }
};