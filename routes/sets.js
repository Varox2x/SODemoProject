var express = require('express');
var router = express.Router();
const setsService = require('../cosmos-sdk/sets.service');

/* GET users listing. */
router.get('/',setsService.getSet, function(req, res, next) {
  res.json({'user': 'nana'})
});

router.post('/',setsService.createSet, function(req, res, next) {
  // setsService.createSet()
  res.json({'user': 'nana'})
});

router.post('/createWord',setsService.createWord, function(req, res, next) {
  // setsService.createWord()
  res.json({'user': 'nana'})
});

module.exports = router;
