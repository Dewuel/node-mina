const express = require('express');
const router = express.Router();
const UserService = require('../service/UserService')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/save', async (req, res) => {
  const body = req.body;
  const response = await UserService.save(body);
  res.json(response)
})

router.get('/list', async(req, res) => {
  const response = await UserService.list();
  res.json(response)
})

router.post('/phone', async (req, res) => {
  const token = req.headers.token;
  if(!token) res.status(401).json({code: 10001, msg: '无访问权限'})

  const response = await UserService.getPhone(req.body, token)
  res.json(response)
})

module.exports = router;
