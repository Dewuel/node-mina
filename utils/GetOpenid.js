const axios = require('axios')
class GetOpenid{
  static async requestWeChat(appid,secret,code){
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    const res = await axios.default.get(url);
    return res.data
  }
}

module.exports = GetOpenid