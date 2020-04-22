const router = require('express').Router()
const HouseService = require('../service/HouseService')

router.get('/list', async(req, res) => {
  const {page, size} = req.query;
  const data = await HouseService.list(page,size)
  res.json(data)
})

module.exports = router