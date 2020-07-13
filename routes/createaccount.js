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

//從信箱的驗證信啟用，資料庫中產生帳號
router.get('/api/createaccount', function(req, res, next) {

    jwt.verify(req.query.token, secret, function(err, decoded){
        if(err) res.send('authDenied');
        else
        {
            pool.getConnection(function(err, connection){
                if(err) throw err;
                querystr = "call sp_register('" +decoded.gmail+ "','" +decoded.mail_hash+ "','" +decoded.pwd_hash+ "','" +decoded.name+ "')";
                connection.query(querystr, function(err, result){
                    if(err) throw err;
                    if(result[0][0].alreadyExist != undefined) {res.send('<script>alert("帳號已經存在了");document.location.href="https://www.tuuuna.com";</script>');}
                    else {res.send('<script>alert("帳號成功開通!");document.location.href="https://www.tuuuna.com";</script>');}
                    connection.release();
                })
            });
        }
    });
});

module.exports = router;

