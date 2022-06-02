const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.session.loggedin,req.session.token,"********&&&&&&&*********");
    const token =req.session.token;
    const decodedToken = jwt.verify(token, process.env.secret_Code);
    const userId = decodedToken.user_id;
    if (req.body.userId && req.body.userId !== userId) {
      console.log('redirect Invalid');
      res.redirect('/login');
    } else {
      next();
    }
  } catch {
    console.log('redirect Auth')
    res.redirect('/login');    
  }
}
