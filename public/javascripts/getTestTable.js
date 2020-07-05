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
        if(xhttp.responseText == 'authDenied') {alert('請先登入喔');}
        else
        {
            var getdata_json = JSON.parse(xhttp.responseText);
            $("#testing").text(getdata_json[0].CName);
        }
        
    }, getCookieByName('token'));
}