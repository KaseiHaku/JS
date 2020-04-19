/** todo 绑定事件处理函数 */
function addEventHandler(target, eventType, handler){
    if(target.addEventListener){//主流浏览器
        addEventHandler = function(target, eventType, handler){
            target.addEventListener(eventType, handler, false); // false 表示冒泡(先触发自己的事件)，true 表示捕获(先触发父标签的事件)
        };
    }else{//IE
        addEventHandler = function(target, eventType, handler){ // 替换掉 标识符 "addEventHandler" 所指对象的地址，对已经添加到事件中的对象不影响
            target.attachEvent("on"+eventType, handler);
        };
    }
    //执行新的函数
    addEventHandler(target, eventType, handler);
}


/** todo 阻止当前事件浏览器默认行为的执行，调用该函数之后最好在事件处理函数中 return false; 再次阻止 */
function preventDefaultCompatible(e){
    if(e.preventDefault){// 如果 event.preventDefault 对象存在
        e.preventDefault();// 设置浏览器不要执行与事件关联的默认动作
    } else if(window.event.returnValue){
        window.event.returnValue = false; //阻止浏览器默认事件，IE 低版本
    }
}

/* todo 阻止当前事件冒泡，调用该函数之后最好在事件处理函数中 return false; 再次阻止 */
function stopPropagationCompatible(e){
    if(e.stopPropagation){// 如果 event.stopPropagation 对象存在
        e.stopPropagation(); // 终止事件在传播过程的捕获、目标处理或冒泡阶段进一步传播。调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
    } else if(window.event.cancelBubble){
        window.event.cancelBubble = true; // 阻止事件冒泡，IE 低版本
    }
}

/** todo 获取触发事件的元素对象 */
function getEventTargetCompatible(e){
    return e.target?e.target:e.srcElement;
}

/** todo 返回当前事件对象 */
function getEventObj(e){
    if (window.event) {
        e = window.event;
    }
    return e;
}

/** 事件处理函数动态绑定：为动态生成的标签添加事件
 * 原理：事件冒泡，在父标签添加同类型事件即可
 * */
function addEventHandlerForDynamicTag(parentObj, eventType, handler){
    addEventHandler(parentObj, eventType, handler);
}
function dynamicTagEventHandler(e){
    e = getEventObj(e);
    var triggerTag = getEventTargetCompatible(e);

    if(triggerTag.id=="myID"){
        // 执行你想要的代码
    }
}

/** todo 获取键盘事件的键盘按键码 */
function getKeyCodeCompatible(e){
    return e.keyCode || e.which || e.charCode;
}

/** 事件处理函数删除 */
function removeEventHandler(target, eventType, handler){
    if(target.removeEventListener){//主流浏览器
        removeEventHandler = function(target, eventType, handler){
            target.removeEventListener(eventType, handler, false);
        }
    }else{//IE
        removeEventHandler = function(target, eventType, handler){
            target.detachEvent("on"+eventType, handler);
        }
    }
    //执行新的函数
    removeEventHandler(target, eventType, handler);
}

