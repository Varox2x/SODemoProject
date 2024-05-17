var express = require('express');
var router = express.Router();
const usersService = require('../cosmos-sdk/users.service');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({'user': 'nana'})
});

router.post('/',usersService.postUser, function(req, res, next) {
  res.json({'user': 'nana'})
});

module.exports = router;
