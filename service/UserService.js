const models = require('../models')
const ResultVo = require('../utils/ResultVo')
const GetOpenid = require('../utils/GetOpenid')
const mina = require('../config/mina')
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')
const Token = require('../utils/token')
const ResultEnum = require('../enums/ResultEnum')

class UserService {

  static async getDecode(data) {
    const secretData = await GetOpenid.requestWeChat(mina.appid, mina.secret, data.code);
    const pc = new WXBizDataCrypt(mina.appid, secretData.session_key)
    return pc.decryptData(data.encryptedData, data.iv)
  }

  static async getPhone(data, token) {
    if (!token) return ResultVo.fail(10001, ResultEnum[10001])
    let tokenData
    try {
      tokenData = Token.verifyToken(token, mina.tokenSecret)
    } catch (error) {
      return ResultVo.fail(10002, error)
    }

    const info = await this.findById(tokenData.id, {
      attributes: {
        include: ['openid']
      }
    });

    if (info.openid !== tokenData.openid) return ResultVo.fail(10003, ResultEnum[10003])
    const resData = await this.getDecode(data)

    await models.User.update({ phone: resData.purePhoneNumber }, {
      where: {
        id: tokenData.id
      }
    });
    return ResultVo.success({phone: resData.purePhoneNumber})
  }

  static async findById(id, attr) {
    const data = await models.User.findByPk(id, attr)
    return data;
  }

  static async save(data) {
    const resData = await this.getDecode(data)
    const res = await models.User.findOrCreate({
      where: {
        openid: resData.openId
      },
      defaults: {
        nickName: resData.nickName,
        avator: resData.avatarUrl,
        gender: resData.gender,
        openid: resData.openId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    });
    const token = Token.genToken({ id: res[0].id, openid: res[0].openid }, mina.tokenSecret)

    const response = {
      id: res[0].id,
      nickName: res[0].nickName,
      avator: res[0].avator,
      gender: res[0].gender,
      token
    }
    return ResultVo.success(response)

    // const user = await models.User.findOne({
    //   where: {
    //     openid: resData.openId
    //   },
    //   attributes: {
    //     exclude: ['openid', 'createdAt', 'updatedAt']
    //   }
    // })
    // if (user) {
    //   const response = {
    //     nickName: user.nickName,
    //     avator: user.avator,
    //     gender: user.gender,
    //     token: Token.genToken({ nickName: user.nickName }, mina.tokenSecret)
    //   }
    //   return ResultVo.success(response)
    // }

    // const result = await models.User.create({
    //   nickName: resData.nickName,
    //   avator: resData.avatarUrl,
    //   gender: resData.gender,
    //   openid: resData.openId,
    // })
    // const response = {
    //   nickName: result.nickName,
    //   avator: result.avator,
    //   gender: result.gender,
    //   token: Token.genToken({ nickName: result.nickName }, mina.tokenSecret)
    // }
    // return ResultVo.success(response);
  }

  static async list() {
    const res = await models.User.findAll({
      attributes: {
        exclude: ['openid', 'createdAt', 'updatedAt']
      }
    })

    return ResultVo.success(res)
  }
}

module.exports = UserService;
