
/** todo JS 防止污染全局变量的方法：只创建一个全局变量 kasei，然后将所有自己的变量全放在 kasei 实例的属性中 */
    (function(){
        window.kasei = new Object();
        kasei.var1 = 1; // 所有需要暴露到全局的变量，都作为 kasei 的属性
        var aa = "fdfa"; // 该实例 aa 在当前匿名函数执行完之后就会被释放
    })();

/** todo JS 模式窗口（Modal Window、情景交互窗口）和非模式窗口 */
    模式窗口：
        模态窗口就是打开一个子窗口，如果这个子窗口不关闭，就不能操作它的父窗口，原来程序暂停执行，直到这个模态窗口关闭后才回到原来程序继续，
        模态窗口独占了用户的输入，当一个模态窗口打开时，用户只能与该窗口进行交互，而其他用户界面对象收不到输入信息
        Example: alert confirm prompt 打开的窗口
    非模式窗口：
        Example: window.open() <a> 等打开的窗口
        

/** todo HTML DOM 事件动态处理 */
    1. 直接覆盖原来的事件函数，js 解析器会取同名函数中的最后一个作为实际处理函数，具体哪个跟 Html 解析顺序有关

    2. 耦合绑定到 onclick 属性上的
        $('#id').attr('onclick', '');  // 设置没有事件函数
        $('#id').removeAttr("onclick"); // 消除事件
        $('#id').attr('href', 'javascript:void(0);'); // a 标签专用
        $('#id').attr('onclick', 'javascript:void(0);');  // a 标签专用
        $('#id').attr('onclick', 'func()');  // 配置触发函数

    3. 非耦合绑定，addEventListener() 和 removeEventListener()
        $('#id').on('click', function(){});  // 绑定事件
        $('#id').off('click', function(){});  // 解绑事件

    4. CSS 控制 DOM 元素不接收事件：
        $('#id').css('pointer-events', 'none');  // 控制当前标签不接收事件，有兼容性问题，注意事件冒泡
        $('#id').css('pointer-events', 'auto');  // 开启接收

 
 
