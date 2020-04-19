/** todo 修改某一个元素的 paste 事件
 * @param target 目标 DOM 对象
 * @param callback 回调函数，包含一个参数 str， str 值为剪贴板中的内容
 * @trap(坑) 1. 只支持字符串处理 2. 部分 IE 版本可能不支持 Ctrl+V 只支持右键粘贴 3. 浏览器默认粘贴动作失效需要自行重写
 * */
function customElementPasteEvent(target, callback){

    function customPasteEventHandler(){
        event.stopPropagation(); // 终止事件在传播过程的捕获、目标处理或冒泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
        event.preventDefault();// 设置浏览器不要执行与事件关联的默认动作
        let clipboardData = event.clipboardData;
        if(clipboardData != null && clipboardData.items.length != 0){ // 如果剪贴板有内容
            let item = clipboardData.items[0]; // 获取第一个剪贴板内容
            if(item.kind=="file"){// 如果是文件
                return false;
            }
            if (item.kind == "string") {// 如果是字符串
                // 取标识符 "customPasteEventHandler" 当前所指对象的地址（注意已经被替换掉了），并执行其中的内容
                // 解释型语言（边编译边执行）的好处，可以在执行过程中替换标识符指向
                // Java 等编译型语言（先编译再执行）比较难搞
                item.getAsString(customPasteEventHandler);
            }
        }
    }

    // 1. 给元素的 paste 事件绑定函数
    target.addEventListener("paste", customPasteEventHandler, false); // 取标识符 "customPasteEventHandler" 所指对象的地址
    // 2. 给元素的 Ctrl+V 绑定事件
    //target.addEventListener("keyup", customPasteEventHandler);


    customPasteEventHandler = function(str){ // 替换掉 标识符 "customPasteEventHandler" 所指对象的地址，对已经添加到事件中的对象不影响

        return callback(str);
    };
}


/** todo paste 事件触发时获取剪贴板数据 */
function getClipboardData(event){
    var result = null; // 返回对象
    var clipboardData = null;
    if(window.clipboardData){
        clipboardData = event.clipboardData; // 兼容性获取 clipboardData 对象
    }

    if(window.event && window.clipboardData){
        /* 是 IE */
        var dataFormatAry = ["text","url","file","html","image"]; // 可用的数据格式列表
        result = clipboardData.getData(dataFormatAry[0]); // 从剪贴板获取指定格式的数据
    }

    /* 不是 IE */
    if(clipboardData!=null && clipboardData.items.length!=0){ // 如果剪贴板有内容
        var item = clipboardData.items[0]; // 获取第一个剪贴板内容
        if(item.kind=="file"){// 如果是文件
            if(item.type=="image/png"){// 如果是图片
                var file = item.getAsFile(); // 获取剪贴板中的文件
                if(!window.FileReader) {// 如果不支持 FileReader
                    alert("Not supported by your browser!");
                    return ;
                }

                var fileReader = new FileReader();
                fileReader.onload = function() { // 配置当文件读取完成时，触发的事件
                    console.log(fileReader.result);
                };
                fileReader.readAsDataURL(file);// 用于图片显示不需要传入后台，reader.result的结果是base64编码数据，直接放入img的src中即可
                var base64Str = fileReader.result;
                result =  base64Str;
            }
        }
        if (item.kind == "string") {// 如果是文件
            if(item.type=="text/plain"){// 如果是普通字符串
                item.getAsString(function(str){
                    result = str;
                });
            }
        }
    }
    return result;
}

/** todo 点击按钮复制文本到剪贴板 
 * @return false: 命令不支持或者执行失败
 * */
function insertStr2Clipboard(str){

    let selection = window.getSelection();      // 获取当前用户 选中（拖蓝） 的实例
    selection.removeAllRanges();                // 清空所有 选中（拖蓝） 的区域

    /** 创建一个 textarea 用于存放需要插入剪贴板的内容 */
    let textarea = document.createElement('textarea');
    document.querySelector('body').appendChild(textarea);
    textarea.value = str;

    textarea.select();      // 把 textarea 的内容变为 选中 状态

    let result = document.execCommand("copy", false, null);  // 执行浏览器复制命令，相当于 Ctrl+C 或者 右键复制

    textarea.parentElement.removeChild(textarea); // 删除临时插入的元素
    return result;
}


/** todo Chrome 下复制事件处理函数
 */
function kaseiCopyEventChrome(event){
    event.preventDefault();
    event.stopPropagation();
    var selection = window.getSelection(); // 获取选中内容
    var copyText = null;

    if (window.clipboardData || event.clipboardData) { // 如果 Browser 支持 clipboardData 对象
        copyText = "KaseiHaku" + selection;
        event.clipboardData.setData ("Text", copyText);
        return false;
    } else {
        /** 思路：
         * 1. 新建一个隐藏 div
         * 2. 把当前选中的内容和自定义内容填充到 div 中
         * 3. 取消原来的选中，并选中 div 中的内容
         * 4. 删除 div
         * */
        copyText = "KaseiHaku" + selection;
        var newDiv = document.createElement('div');
        newDiv.style.position='absolute';
        newDiv.style.left='-99999px';
        HTMLBodyElement.appendChild(newDiv);
        newDiv.innerHTML = copyText;
        selection.selectAllChildren(newDiv);
        window.setTimeout(function() {
            HTMLBodyElement.removeChild(newDiv);
        },0);
    }
}


// copy or cut event
function copyOrCutEventHandler(e){

    // 1. 获取用户选中文本
    var userSelectContent = null;

    // 2. 对用户选中文本做处理
    userSelectContent += "====";

    // 3. 写入到系统剪贴板
    e.clipboardData.setData('text/plain', userSelectContent);
    e.clipboardData.setData('text/html', '<b>Hello, world!</b>');
    e.preventDefault();
}


