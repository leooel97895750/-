//1. 註冊介面轉換
//1.1. 登入頭像、背景黑屏轉換、帳戶資料
let islogin = 0;
function pressLogin() 
{
    //1.1.1. 開啟登入介面
    if(islogin == 0)
    {
        if($("#signup-box").css('display') == 'none' && $("#login-box").css('display') == 'none')
        {
            $("#login-box").slideDown();
            $("#dark-mask").css('display', 'block');
        }
        else
        {
            $("#signup-box").slideUp();
            $("#login-box").slideUp();
            $("#dark-mask").css('display', 'none');
        }
    }
    //1.1.2. 開啟帳戶資料頁面
    else
    {
        $("#member-box").slideToggle();
        $("#dark-mask").toggle();
    }
}
//1.2. 登入註冊按鈕
function toLogin()
{
    $("#signup-box").css('display', 'none');
    $("#login-box").slideDown();
}
function toSignup()
{
    $("#login-box").css('display', 'none');
    $("#signup-box").slideDown();
}

function register()
{
    //2. 獲取登入資料
    var newmail = $("#newmail").val();
    var newpassword = $("#newpassword").val();
    var againpassword = $("#againpassword").val();
    var newname = $("#newname").val();
    if(newmail == '' || newpassword == '' || againpassword == '' || newname == '') alert('尚有未填寫資料');
    else
    {
        if(newpassword != againpassword) alert('密碼不一致');
        else
        {
            //2.1. 檢查Mail_hash是否重複
            var mail_hash = hex_sha1(newmail);
            var getmailhash_url = "/api/getmailhash?mail_hash="+mail_hash;
            getAPI(getmailhash_url, function(xhttp){
                var getmailhash_json = JSON.parse(xhttp.responseText);
                if(getmailhash_json[0] != undefined) alert('此信箱已註冊');
                else
                {
                    //2.2. server寄信至信箱驗證
                    //2.3. 信箱網址開通帳號並寫入資料庫
                    //2.4. 回傳夾帶cid的jwt
                    alert('驗證信已寄至信箱\n請至信箱查看並開通帳號');
                    var pwd_hash = hex_sha1(newpassword);
                    var sendmail_url = "/api/sendmail?gmail="+newmail+"&mail_hash="+mail_hash+"&pwd_hash="+pwd_hash+"&name="+newname;
                    getAPI(sendmail_url, function(xhttp){
                        if(xhttp.responseText == 'fail') alert('系統錯誤請稍後再試');
                    });  
                    $("#signup-box").slideUp();
                    $("#dark-mask").css('display', 'none');
                }
            });
        }
    }
}

//3. 登入
function login()
{
    var myaccount = $("#myaccount").val();
    var mypassword = $("#mypassword").val();
    var mail_hash = hex_sha1(myaccount);
    var pwd_hash = hex_sha1(mypassword);
    var login_url = "/api/login?mailhash="+mail_hash+"&pwdhash="+pwd_hash;
    getAPI(login_url, function(xhttp){
        if(xhttp.responseText == 'authDenied' || xhttp.responseText == 'fail') alert(xhttp.responseText+'\n請重新登入');
        else
        {
            //登入成功，取得jwt存入cookie
            document.cookie = 'token=' + xhttp.responseText;
            $("#login-box").slideUp();
            $("#dark-mask").css('display', 'none');
            getmemberData();
        }
    });
}

//3.1 根據token取得使用者資料，成功則islogin=1;
function getmemberData()
{
    //取得使用者資料
    var getmember_url = "/api/getmember";
    getAPI(getmember_url, function(xhttp) {
        if(xhttp.responseText == 'authDenied' || xhttp.responseText == 'fail') islogin = 0;
        else
        {
            var getmember_json = JSON.parse(xhttp.responseText);
            $("#member-name").text(getmember_json[0].Name);
            $("#member-mail").text(getmember_json[0].Mail);
            islogin = 1;
        }
    }, getCookieByName('token'));
}