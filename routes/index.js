var express = require('express');
var query = require('./query.js');
var router = express.Router();
	
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query);
	console.log(req.query.username);
  res.render('index', { title: 'Express' });
});

router.get('/account',function (req,res) {
	var tablename = "user";
	var msg={
		username : req.query.username,
		password : req.query.password,
		mail : req.query.mail,
	}
	query.add(tablename,msg,function (result) {
		console.log(result.msg);
		res.send(result);
	});
})
router.post('/account',function (req,res) {
	var tablename = "user";
	var msg={
		username : req.body.username,
	}
	query.query(tablename,msg,function (result) {
		console.log(result.msg);
		res.send(result);
	});
})

module.exports = router;
