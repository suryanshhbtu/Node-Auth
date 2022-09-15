const jwt = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try{
        // getting token from headers
        const token = req.headers.authorization.split(" ")[1]; // using split to use token after bearer 
        console.log(token);

        const decoded = jwt.verify(token, process.env.JWT_KEY); // decode will decode only not verify, verify ->verification + decoding ,
        // if(no token present ) -> fails
        req.userData = decoded;   // for future requests
        next();
    }catch(error){
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
};