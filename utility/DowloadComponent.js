/** todo Web Client Download Component
 * */
function DownloadComponent(){

    /** todo 动态表单下载
     * @param url 表单提交的 url 地址
     * @param method 表单提交的 http 方法
     * @param paramsObj 表单提交的参数， 如果是多值，使用数组形式
     * @param target 打开窗口的位置，默认值为 _self
     * @trap 下载 method 必须为 post ，不然会覆盖 url 中自带的参数
     * */
    this.dynamicForm = function(url, method, paramsObj, target){

        var body = document.body;
        var div = document.createElement("div");
        body.appendChild(div);

        if(method === void(0) || method === null || method === ""){
            method = 'post';
        }

        if (target === undefined || target === null) {
            target = "_self";
        }
        var formStr = '<form action="'+ url +'" method="'+ method +'" accept-charset="UTF-8" autocomplete="off" novalidate target="'+ target +'" name="KaseiHakuDynamicForm" enctype="application/x-www-form-urlencoded">';
        var fieldValue = null;
        var i = 0;
        for (var field in paramsObj) {
            fieldValue = paramsObj[field];
            if(Array.isArray(fieldValue)){
                for (i = 0; i < fieldValue.length; i++) {
                    formStr += '<input type="text" name="'+ field +'" value="'+ fieldValue[i] +'"/><br/>';
                }
            } else {
                formStr += '<input type="text" name="'+ field +'" value="'+ fieldValue +'"/><br/>';
            }
        }
        formStr += '</form>';

        div.innerHTML = formStr; // innerHTML 会自动解析成 DOM 对象
        var form = div.firstChild; // 获取解析后的 DOM 对象
        form.submit();
        body.removeChild(div);
    };


    /** todo 动态 a 标签下载
     * @param url a 标签的 href 属性值
     * */
    this.dynamicATag = function(url, target){
        var body = document.body;
        var div = document.createElement("div");
        body.appendChild(div);

        if (target == undefined || target == null) {
            target = "_self";
        }
        var aStr = '<a href="'+ url +'" target="'+ target +'">Kasei Haku Dynamic Hyperlink</a><br/>';

        div.innerHTML = aStr;
        var a = div.firstChild;
        a.click();
        body.removeChild(div);
    };

    /** todo 动态 iframe 标签下载
     * @param url iframe 标签的 src 属性
     * @trap 坑：不能生成后立马删除 iframe 标签，否则下不下来。
     * @advantage 优点：可执行 iframe 中的 js
     * */
    this.dynamicIframe = function(url){
        var body = document.body;
        var div = document.createElement("div");
        body.appendChild(div);

        var iframeStr = '<iframe src="'+ url +'"></iframe>';

        div.innerHTML = iframeStr;
        var iframe = div.firstChild;
        //body.removeChild(div);
    };

    /** todo 直接 js 打开一个新窗口
     * */
    this.openWindow = function (url, target){
        window.open(url, target);
    };
}
