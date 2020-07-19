//上傳圖片到imgur，並將產生的圖片id存入資料庫
function uploadImg(htmlid)
{
    let fileUploader = document.getElementById(htmlid).files[0];
    console.log(fileUploader);
    if(fileUploader == undefined) alert('還沒選與圖片喔');
    else
    {
        var form = new FormData();
        form.append("image", fileUploader);
        form.append("title", fileUploader.name); 
        form.append("description", getSecTime()); 
        
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.imgur.com/3/image",
            "method": "POST",
            "headers": {
            "authorization": "Bearer c63a2f30ade6aaca739bb43c57298963aa002550",
            },
            "processData": false,
            "contentType": false,
            "mimeType": "multipart/form-data",
            "data": form
        };

        $.ajax(settings).done(function (response) {
            let response_json = JSON.parse(response);
            console.log(response_json);
            let updatememberimg_url = "/api/updatememberimg?imgurl="+response_json.data.link+"&imgid="+response_json.data.id;
            getAPI(updatememberimg_url, function(xhttp){
                if(xhttp.responseText == 'authDenied') {alert('請重新登入');}
                else if(xhttp.responseText == 'sqlregex fail') {alert('資料包含特殊字元');}
                else alert('上傳成功');
                getmemberData();
            }, getCookieByName('token'));
        });
    }
}

//透過圖片id查詢圖片詳細資料
function downloadImg()
{
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.imgur.com/3/image/dClK8mt",
        "method": "GET",
        "headers": {
          "authorization": "Bearer c63a2f30ade6aaca739bb43c57298963aa002550",
        }
    };

    $.ajax(settings).done(function (response) {
        console.log(response.data);
    });
}
//回傳年月日
function getDayTime() 
{
    var date = new Date();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('');
}
//回傳年月日時分秒
function getSecTime()
{
    var date = new Date();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours(); 
    var mi = date.getMinutes(); 
    var ss = date.getSeconds();

    return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd, (hh > 9 ? '' : '0') + hh, (mi > 9 ? '' : '0') + mi, (ss > 9 ? '' : '0') + ss].join('');
}

function uploadMemberImg()
{
    $("#uploadimg-box").slideToggle();
}