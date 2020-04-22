const express = require('express');
const router = express.Router();
const fs = require('fs')
const ResultVo = require('../utils/ResultVo')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/city', async (req, res) => {
  fs.readFile('mock/city.json', 'utf8', (err, data) => {
    if(err) return;
    const response = ResultVo.success(JSON.parse(data))
    res.json(response)
  })
})

router.get('/tags', async (req, res) => {
  fs.readFile(`mock/${req.query.type}.json`, 'utf8', (err, data) => {
    if(err) return ResultVo.fail(-1, '读取错误');
    const response = ResultVo.success(JSON.parse(data))
    res.json(response)
  })
})

module.exports = router;
