var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Discover Something Good | Crayvyt', page_id: 'home-page' });
});


router.get('/search', function (req, res, next) {
  res.render('search', { title: 'Searching', page_id: 'search-page' });
});

module.exports = router;
