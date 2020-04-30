const router = require('express').Router()
const HouseService = require('../service/HouseService')

router.get('/list', async (req, res) => {
  const { page, size } = req.query;
  const data = await HouseService.list(page, size)
  res.json(data)
})

router.get('/detail/:id', async (req, res) => {
  const { id } = req.params;
  const data = await HouseService.detail(id)
  res.status(200).json(data)
})

module.exports = router