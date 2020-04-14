const jwt = require('jsonwebtoken')

class Token{
  static genToken(info , secret){
    return jwt.sign(info, secret, {
      expiresIn: 3600
    });
  }

  static verifyToken(token, secret){
    return jwt.verify(token, secret)
  }
}

module.exports = Token