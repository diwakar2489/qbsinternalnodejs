var jwt = require("jsonwebtoken");

module.exports.verifyToken = (req, res, next) => {
    const cookiesData = req.cookies.refreshToken;
    const authHeader = req.headers['authorization'] || cookiesData;

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401).json({ msg: "A token is required for authentication" });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403).json({ msg: "Invalid Token" });
            } else {
                req.email = decoded.email;
                next();
            }

        })
    }

}