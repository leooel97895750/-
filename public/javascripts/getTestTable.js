function createToken()
{
    var name = $("#name").val();
    var gettoken_url = "/api/gettoken?name="+name;
    getAPI(gettoken_url, function(xhttp){
        document.cookie = 'token=' + xhttp.responseText + ';max-age=300';
        console.log(getCookieByName('token'));
    });
}

//需驗證的請求格式
function getData()
{
    var getdata_url = "/api/getdata";
    getAPI(getdata_url, function(xhttp){
        //若驗證失敗，則提示登入並重新導向
        if(xhttp.responseText == 'authDenied')
        {
            if(confirm("要先登入喔\n按確定回首頁登入")) {window.location.reload();}
        } 
        
        else 
        {
            var getdata_json = JSON.parse(xhttp.responseText);
            $("#testing").text(getdata_json[0].CName);
        }
        
    }, getCookieByName('token'));
}

function testshal(e)
{
    var password = $("#name").val();
    console.log("沒有加密之前的是："+password);
        if(e == 1){
            var shalpassword = hex_sha1(password);
            console.log("hex_sha1方式加密後是："+shalpassword);
        }
        else if(e == 2){
            var shalpassword = b64_sha1(password);
            console.log("b64_sha1方式加密後是："+shalpassword);
        }
        else if(e == 3){
            var shalpassword = str_sha1(password);
            console.log("str_sha1方式加密後是："+shalpassword);
        }
}

function reg()
{
    var sqlregex = /[;-\s\n\t\v\b/'"!`#)(=+|]/;
    var testval = $("#name").val();
    console.log(re.test(testval));
}