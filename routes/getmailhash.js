require('dotenv').config();
let mysql = require('mysql');
let pool = mysql.createPool({
  host : process.env.HOST,
  user : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
});
let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const sqlregex = /[;-\s\n\b'/"!`#}!{$&})(=+*|]/;

//傳入mail_hash，回傳查詢結果
router.get('/api/getmailhash', function(req, res, next) {

    pool.getConnection(function(err, connection){
        if(err) throw err;
        querystr = "select Mail_hash from `member` where Mail_hash='"+req.query.mail_hash+"'";
        connection.query(querystr, function(err, result){
            if(err) throw err;
            res.send(result);
            connection.release();
        })
    });
});

module.exports = router;

