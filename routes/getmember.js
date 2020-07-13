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

//輸入CID 輸出member table資料
router.get('/api/getmember', function(req, res, next) {

    //jwt驗證(避免無權限者使用api)
    jwt.verify(req.headers['token'], secret, function(err, decoded){
        if(err) res.send('authDenied');
        else
        {
            //參數驗證(避免sql injection)
            let p1 = decoded.mycid;
            if(sqlregex.test(p1) == false)
            {
                pool.getConnection(function(err, connection){
                    if(err) throw err;
                    querystr = "select m.MID, m.Name, m.CDes, m.Mail, m.Since, m.LastModifyDT, m.Sex, m.Phone, m.Birthday, m.Address, m.FriendsNum, m.CID from class c, co, object o, `member` m where c.CID="+p1+" and c.CID=co.CID and co.OID=o.OID and o.OID=m.MID";
                    connection.query(querystr, function(err, result){
                        if(err) throw err;
                        res.send(result);
                        connection.release();
                    })
                });
            }
            else
            {
                res.send('fail');
                console.log('sqlregex fail');
            } 
        }
    });
});

module.exports = router;

