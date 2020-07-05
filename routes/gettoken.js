var mysql = require('mysql');
var pool = mysql.createPool({
  host : '?',
  user : '?',
  password : '?',
  database : '?'
});
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const SECRET = '?';
//測試用
router.get('/api/gettoken', function(req, res, next) {

    pool.getConnection(function(err, connection){
        if(err) throw err;
        const token = jwt.sign({}, SECRET, { expiresIn: '1 day' });
        querystr = "insert into test_table(CName, CDes) values('"+req.query.name+"','"+token+"')";
        connection.query(querystr, function(err, result){
            if(err) throw err;
            res.send(token);
            connection.release();
        })
    });
});

module.exports = router;

