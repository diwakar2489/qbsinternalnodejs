var jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
    const cookiesData = req.cookies.refreshToken;
    const authHeader = req.headers['authorization'] || cookiesData;
    console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    
    if(token == null) {
        console.log('please provide token')
        return res.sendStatus(401);
    }else{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            // console.log(token);
            // console.log(process.env.ACCESS_TOKEN_SECRET);
             console.log(decoded);
            if(err) {
                console.log('please provide token vaild token')
                return res.sendStatus(403);
            }else{
                console.log('token verify')
                req.email = decoded.email;
                next();
            }
            
        })
    }
    
}