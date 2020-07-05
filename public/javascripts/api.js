//非同步API請求，傳入網址、回傳函式、jwt

function getAPI(url, callFun, token='noneed') {
    var xhttp;
    if (window.XMLHttpRequest) {
      // code for modern browsers
      xhttp = new XMLHttpRequest();
      } else {
      // code for IE6, IE5
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        callFun(this);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader('token', token);
    xhttp.send();
}