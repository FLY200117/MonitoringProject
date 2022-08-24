function obj2str(obj) {
    var res = [];
    for (var key in obj) {
        res.push(key + "=" + obj[key]);
    }
    return res.join("&");
}

function ajax(obj) {
    const url = 'http://localhost:4000/test'
    var xmlhttp = new XMLHttpRequest();
    var str = obj2str(obj.data);
    xmlhttp.open(obj.type, url +obj.url + "?" + str, true);

    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            clearInterval(timer);
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304) {
                obj.success(xmlhttp)
            } else {
                obj.error(xmlhttp)
            }
        }
    }

    if (obj.timeout) {
        timer = setInterval(function () {
            console.log("中断请求");
            xmlhttp.abort();
            clearInterval(timer);
        }, obj.timeout);
    }
}