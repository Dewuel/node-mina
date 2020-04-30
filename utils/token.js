const jwt = require('jsonwebtoken')

class Token{
  static genToken(info , secret){
    return jwt.sign(info, secret, {
      expiresIn: expiresIn
    });
  }

  static verifyToken(token, secret){
    return jwt.verify(token, secret)
  }

  static isExpiresIn(token, secret){
    const data = jwt.verify(token, secret)
    const date = parseInt(new Date().getTime() / 1000);
    if(date > data.exp){
      return true;
    }
    return false;
  }
}

module.exports = Token