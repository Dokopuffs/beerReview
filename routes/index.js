var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Take me to.....the VOLCANO!!!");
});

module.exports = router;
