const jwt = require('jsonwebtoken');
const config = process.env;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
      return res.sendStatus(403);
    }
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if(err){
          return res.sendStatus(403);
        }
        req.userId = decoded.user_id;
        next();
    })
}
 
module.exports = verifyToken;
