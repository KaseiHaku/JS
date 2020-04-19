/********************************* JavaScript 编程信条 *************************************/
/** JS Optimization ************************************/
1. 所有<script> 标签放在 </body> 标签之前：确保脚本执行前，完成页面渲染，不会造成页面阻塞问题
2. script 标签添加 defer 或 async 属性，进行无阻塞加载 JS： async 加载完立刻执行脚本，defer 加载完等待页面也加载完成才会执行代码
3. 动态加载 JS: 即通过动态生成 <script> 标签，或者 ajax 获取 js 内容后，在生成 <script> 标签，最后将 script 标签插入到 head 或者 body 最后


// 所有出来操作都在原对象上处理，也只返回处理后的原对象，如果需要新建对象，那么在元对象上提供 copy 方法
/** todo 被掉函数出错尽量使用 throw 来抛出异常，而不是采用返回特定的值，来表示出错 */
function beInvoke(param){
    if(param === undefined || param === null || param === ''){
        throw new Error('参数不能为空！');
    }
}
function caller(){
    try{
        beInvoke();
    } catch(e){
        if(e instanceof Error){
            alert(e.message);
        }
    } finally {
        console.log('try-catch');
    }
}





/** 0 => 函数优化: 函数不宜过大，尽量减少参数，传递对象替代过长的参数列表， */
// 把条件分支提炼成函数
function getPrice(price){ // 夏季商品全部 8 折
    var date = new Date();

    // 判断是否是夏季，6-9 月为夏季
    if(date.getMonth()>=6 && date.getMonth()<=9) {
        return price*0.8;
    }
}


function getPriceOptimize(price){
    if(isSummer()){ // 优化判断，更容易理解
        return price*0.8;
    }
}
function isSummer(){
    var date = new Date();
    return date.getMonth()>=6 && date.getMonth()<=9;
}

// 反转判断表达式 return 跳出分支结构
function del(obj){
    var ret;
    if(!obj.isReadOnly){ // 如果该对象不是只读，才能被删除
        if(obj.isDirectory) { // 如果该对象是目录
            ret = deleteDirectory(obj);
        }else if(obj.isFile){ // 如果该对象是文件
            ret = deleteFile(obj);//
        }
    }
    return ret;
}

function delOptimize(obj){ // 优化后的分支
    if(obj.isReadOnly){
        return ;
    }
    if(obj.isDirectory){
        return deleteDirectory(obj);
    }
    if(obj.isFile){
        return deleteFile(obj);
    }
}


// 合理使用循环，来避免代码结构嵌套
function createXHR(){
    var xhr;
    try{
        xhr = new ActiveXObject("MSXML2.XMLHttp.6.0");
    }catch(e){
        try{
            xhr = new ActiveXObject("MSXML2.XMLHttp.3.0");
        }catch(e){
            xhr = new ActiveXObject("MSXML2.XMLHttp");
        }
    }
}

function createXHR_Optimize(){
    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
    for(var i=0, version; version = versions[i++]; ){
        try{
            xhr = new ActiveXObject(version);
        }catch(e){

        }
    }
}

// 使用 return 退出多重循环
function afterFor(){
    console.log("在跳出循环后执行！");
}
function breakByReturn(){
    for(;;){
        for(;;){
            for(;;){
                return afterFor(); //如果需要在循环结束后执行代码，那么放在 return 后面
            }
        }
    }
}




// 1 将 JS 从 CSS 中抽离，即不要用 JS 直接修改 CSS 属性，JS 只负责添加 class 属性
var ele = document.getElementById("id")
ele.classList.add("className");
ele.classList.remove("className");

// 2 JS 代码中不要存在 DOM 结构，而是使用字符串模板

// 3 不要使用全局变量，
// 替代方案一：依赖尽可能少的全局变量，即只创建一个全局变量，如jQuery
var global = {
    // 其他所有全局变量都放在这里，当做一个属性
}

// 替代方案二：使用模块

// 4 事件处理：隔离应用逻辑，不要分发事件对象
var MyApplication = {

    /** 以下函数是 事件处理函数 */
    handleClick: function(event){ // event 对象存在且只存在该方法中，即不分发事件对象
        event.preventDefault(); // 阻止执行与该事件关联的默认动作，如 submit 表单提交
        event.stopPropagation();// 阻止事件冒泡
        this.showPopup(event.clientX, event.clientY); // 调用应用逻辑，即隔离应用逻辑了
    },

    /** 以下函数是 应用逻辑 */
    showPopup: function(){
        // 修改 CSS 等操作
    }
};

// 5 配置数据
var DataConfig = {
  MSG_IVALID_VALUE: "Invalid value",
  URL_TEMPLATE: "/erros/invalid.php",
  CSS_SELECTED: "selected"
};
