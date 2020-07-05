var mysql = require('mysql');
var pool = mysql.createPool({
  host : '127.0.0.1',
  user : 'leooel97895750',
  password : '9789575leooel0',
  database : 'tuuuna'
});
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const SECRET = ':)9789^-^leooel;';

//測試用
router.get('/api/getdata', function(req, res, next) {

    jwt.verify(req.headers['token'], SECRET, function(err, decoded){
        if(err) res.send('authDenied');
        else
        {
            console.log(decoded);
            pool.getConnection(function(err, connection){
                if(err) throw err;
                querystr = "select * from test_table";
                connection.query(querystr, function(err, result){
                    if(err) throw err;
                    res.send(result);
                    connection.release();
                })
            });
        }
    });
});

module.exports = router;

