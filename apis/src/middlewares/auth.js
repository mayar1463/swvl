
const jwt = require('jsonwebtoken');
let secret = 'secret';
const endPoint = ['signUp', 'signin', 'forgotPassword', 'refreshToken', 'changePassword']
exports.auth = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    if (endPoint.includes('req.baseUrl.split(' / ')[3]')) {
      let secret = 'abc';
    }
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, secret, function (err, decoded) {
      if (err)
        res.status(401).json();
      else {
        console.log(decoded.data);
        next()
      }
    })
  } else
    res.status(401).json();
};

exports.sign = (req, res, next) => {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    data: { "userId": 23, "Name": "mayar hussain" }
  }, secret);
}