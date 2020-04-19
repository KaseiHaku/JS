/** URL 完整格式：
 * scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
 * 协议：用户：密码@yum：端口/路径？参数#锚点
 * URL 可用字符：[0-9a-zA-Z] 和 $-_.+*'() 及一些保留字，其他字符都需要编码后才能用于 URL
 * */

function encode(url){
    return encodeURI(url);
}

function decode(url){
    return decodeURI(url);
}


function UrlUtil(){

    /**
     * @Param url 需要匹配的 url 
     * @Param name 需要获取的参数名
     * @Param caseSensitive 大小写敏感，false 不敏感
     * @Return null 未找到匹配参数 
     * @Return 一个数组，包含该参数的所有值
     **/
    function getUrlParamByName(url, name, caseSensitive){
        var modifier = "g";
        // 判断 caseSensitive 的类型
        if(typeof caseSensitive ==="boolean" && caseSensitive === false){
            modifier = "ig";
        }
        var regExp  = new RegExp('(?<=(^|\\?|&)'+name+'=)([^&#]*)(?=$|#|&)', modifier);
        console.log(regExp.toString());
        console.log(url.match(regExp));
        return url.match(regExp);
    }
    
     /** 根据参数名获取 url 参数 */
    this.getCurrentWindowUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
        return null;
    };

    /** 获取项目部署名 */
    this.getProjectPath = function(){
        var pathName = window.location.pathname;
        var strAry = pathName.split("/");
        var result = "/"+strAry[1];
        return result;
    };
}
