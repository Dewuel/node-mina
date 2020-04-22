const ResultVo = require('../utils/ResultVo')
const axios = require('axios')
class HouseService{
  static async list(page=1, size=10){
    const res = await axios.default.get(`http://www.fanggecn.com/index/house/getHouse?page=${page}&size=${size}`)
    if(!res) return ResultVo.fail(res.data.msg)
    const response = {
      count: res.data.data.count,
      houseList: res.data.data.house
    }
    return ResultVo.success(response)
  }
}

module.exports = HouseService