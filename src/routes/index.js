var express = require('express');
var router = express.Router();

/**
 * @path: /
 * @method: GET
 * @params:
 * @return: Render - status(200 OK)
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;