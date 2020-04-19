/********************************* js cookie 相关操作工具：start ***********************************************/
// 创建 cookie
// 最优的使用方法：createCookie("name", "value", 10, null, "/")
// 坑：Domain、Path、Name三者唯一确定一个cookie。
// 坑：js 不能设置 cookie 的 httpOnly 属性
// 坑：跨域请求不能携带 cookie
function createCookie(name, value, expireMinute, domain, path, secure) {

    var cookieStr = "";

    if(arguments[0] !== undefined
        && arguments[0] !== null
        && arguments[0] !== ""
        && arguments[1] !== undefined
        && arguments[1] !== null
        && arguments[1] !== ""){
        cookieStr += arguments[0] + "=" + encodeURIComponent(arguments[1]) + "; ";
        //cookieStr += arguments[0] + "=" + arguments[1] + "; ";
    } else {
        return false;
    }

    // 设置过期时间
    // 坑：默认过期时间是 session ，即浏览器关闭
    if(arguments[2] !== undefined && arguments[2] !== null){
        var date  = new Date();
        var ms = arguments[2] * 60 * 1000
        date.setTime(date.getTime() + ms);
        expires = date.toGMTString();
        cookieStr += "expires=" + expires + "; ";
    } else {
        cookieStr += "expires=" + 0 + "; ";
    }


    // 设置有效域
    // 坑：只能设置当前页面域名，如：aa.bb.cc.kasei.com 那么只能设置 kasei.com 或 cc.kasei.com 以此类推
    if(arguments[3] !== undefined && arguments[3] !== null && arguments[3] !== ""){
        cookieStr += "domain=" + arguments[3] + "; ";
    } else {
        cookieStr += "domain=" + window.location.hostname + "; ";
    }

    // 设置路径
    // 坑：默认路径为当前页面 url 除去文件名
    if(arguments[4] !== undefined && arguments[4] !== null && arguments[3] !== ""){
        cookieStr += "path=" + arguments[4] + "; ";
    } else {
        var last = window.location.pathname.lastIndexOf("/");
        var path = window.location.pathname.substring(0, last);
        cookieStr += "path=" + path + "; ";
    }

    // 表示只有在 https 请求的时候才发送 cookie
    // 坑：该属性只有在https协议的网页中，客户端设置secure类型的 cookie 才能成功
    if(arguments[5] !== undefined && arguments[5] !== null && arguments[5] === true){
        cookieStr +=  "secure; ";
    }

    cookieStr = cookieStr.substring(0, cookieStr.length-2);
    document.cookie = cookieStr;
    return true;
}


// 获取 cookie 的 value 内容
// 只能获取默认 domain 和 path 的cookie
function getCookie(name){
    var cookieStr = document.cookie;
    var cookieAry = cookieStr.split("; ");
    for(var i = 0; i < cookieAry.length; i++){
        var ary = cookieAry[i].split("=");
        if(name === ary[0]){
            return decodeURIComponent(ary[1]);
            //return ary[1];
        }
    }
    return null;
}


// 删除 cookie，因为 js 没有准确读取 cookie  domain 和 path 两个属性的值的方法，所以无法准确的删除一个 cookie
// 只能删除默认 domain 和 path 的cookie
function delCookie(name){

    var cookieStr = "";
    var date = new Date();
    date.setTime(date.getTime() - 1);
    var cval = getCookie(name);
    var path = getProjectPath();
    if(cval != null) {
        document.cookie = name + "=; expires=" + date.toGMTString()
            + "; domian=" + window.location.hostname
            + "; path=" + path;
        return true;
    }
    return false;
}


// 添加 cookie ，主要使用此方法
function addCookie(name, value, expireMinute){
    var path = getProjectPath();
    return createCookie(name, value, expireMinute, null, path, null);
}

// 类，向指定的cookie存放和读取数据，数据格式 = hh:yy&aa:tt&name:kasei 注意：存储的数据内部不能存在 & 字符
function CookieData(){

    this.putData = function(key, value, cookieName){
        var str = key + ":" + value;
        var cookieValue = getCookie(cookieName);
        if(cookieValue === null){
            return addCookie(cookieName, str, null);
        }

        var result = "";
        var dataAry = cookieValue.split("&");
        for(var i = 0; i < dataAry.length; i++){
            if(dataAry[i] === ""){
                dataAry.splice(i,1);
            }
        }

        var flag = false;
        for(var i = 0; i < dataAry.length; i++){
            var ary = dataAry[i].split(":");
            if(key === ary[0]){
                result += ary[0]+":"+value+"&";
                flag = true;
            } else {
                result += dataAry[i] + "&";
            }
        }

        // cookie有值，但是不存在这个 key
        if(flag !== true){
            return addCookie(cookieName, cookieValue +"&"+ str, null);
        }
        result = result.substring(0, result.length-1);
        return addCookie(cookieName, result, null);
    }


    this.getData = function(key, cookieName){
        var cookieValue = getCookie(cookieName);
        if(cookieValue !== null){
            var dataAry = cookieValue.split("&");
            for(var i = 0; i < dataAry.length; i++){
                if(dataAry[i] === ""){
                    dataAry.splice(i,1);
                }
            }
            for(var i = 0; i < dataAry.length; i++){
                var ary = dataAry[i].split(":");
                if(key === ary[0]){
                    return ary[1];
                }
            }
        }
        return null;
    }

    this.removeData = function(key, cookieName){
        var cookieValue = getCookie(cookieName);
        if(cookieValue === null){
            return false;
        }

        var dataAry = cookieValue.split("&");
        for(var i = 0; i < dataAry.length; i++){
            if(dataAry[i] === ""){
                dataAry.splice(i,1);
            }
        }
        for(var i = 0; i < dataAry.length; i++){
            var ary = dataAry[i].split(":");
            if(key === ary[0]){
                dataAry.splice(i,1); // 从 i 下标开始删除 1 个元素
            }
        }

        var result = "";
        for(var i=0; i< dataAry.length; i++){
            result += dataAry[i] + "&";
        }
        if(result !== ""){
            result = result.substring(0, result.length-1);
            return addCookie(cookieName, result, null);
        }
        return delCookie(cookieName);
    }
}
/********************************* js cookie 相关操作工具：end ***********************************************/