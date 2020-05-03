const ResultVo = require('../utils/ResultVo')
const axios = require('axios')
const http = require('http');
const cheerio = require('cheerio');
class HouseService {
  static async list(page = 1, size = 10) {
    const res = await axios.default.get(`http://www.fanggecn.com/index/house/getHouse?page=${page}&size=${size}`)
    if (!res) return ResultVo.fail(res.data.msg)
    const response = {
      count: res.data.data.count,
      houseList: res.data.data.house
    }
    return ResultVo.success(response)
  }

  static async detail() {
    return ResultVo.successNull()
  }

  static async album() {
    const url = 'http://www.fanggecn.com/index/house/gallery.html?id=657';

    const promise = new Promise((resolve, reject) => {
      http.get(url, res => {
        const chunks = [];
        let num = 0;
        res.on('data', chunk => {
          chunks.push(chunk)
          num += chunk.length;
        })

        res.on('end', () => {
          let data = Buffer.concat(chunks, num)
          let html = data.toString();
          const $ = cheerio.load(html);
          const result = []
          $('.album-box').find('.album-change').eq(0).find('.album-item').each(index => {
            const map = {}
            map.id = $('.album-box').find('.album-change').eq(0).find('.album-item').eq(index).attr('data-id')
            map.typeId = $('.album-box').find('.album-change').eq(0).find('.album-item').eq(index).find('.album-item-img').attr('data-tid')
            map.url = $('.album-box').find('.album-change').eq(0).find('.album-item').eq(index).find('.album-item-img').attr('src')

            result.push(map);
          })
          resolve(result)
        })
      })
    })
    const data = await promise;

    return ResultVo.success(data)
  }

}

module.exports = HouseService