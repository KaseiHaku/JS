try{
    throw {message: 'throw 不继承自 Error 对象的异常对象'};
    throw new Error('manually throw'); // 注意： try catch 能检查的是代码的非法性，如果代码合法，只是逻辑真假，那么用 if 语句
} catch(error){
    if(error instanceof ReferenceError){
        console.log('捕获引用异常');
    } else if(error instanceof Error){
        console.log('捕获所有异常对象，因为 Error 是所有异常的祖先');
        console.log('错误名称=' + error.name);
        console.log('错误信息=' + error.message);
        console.log('错误发生时的调用栈=' + error.stack);
    } else {
        console.log('捕获普通对象： '+error.aa);
    }
} finally {
    console.log('始终会执行这部分代码');
}


// 自定义异常
function KaseiError(message){
    this.name = 'KaseiError';
    this.message = message ;
    this.stack = (new Error()).stack;
}
KaseiError.prototype = Object.create(Error.prototype);
KaseiError.prototype.constructor = KaseiError;


// function Error(){}
let error = new Error();            // JS 所有错误的接口
let error = new EvalError();        // 使用 eval(js) 执行 js 代码出错时的报错
let error = new RangeError();       // 当一个数值变量或参数的有效范围之外
let error = new ReferenceError();   // 引用无效
let error = new SyntaxError();      // 语法错误
let error = new TypeError();        // 变量或参数类型错误
let error = new URIError();         // encodeURI() or decodeURI() 两个方法的参数非法时


/** todo Conclusion: JS 所有异步异常，如果需要捕获，那只能在异步代码内部才能捕获到
 * */

/** todo 捕获 代码异常 及 资源加载异常 */
window.addEventListener('error', function(event){
    alert(event.error.message);
});


/** todo 捕获 Promise reject 异常 */
window.addEventListener('unhandledrejection', function(event){
    alert(event.reason.message);   // reject(new Error());  或者 throw new Error(); 必须是一个 Error 实例
    // 在使用 Promise 的时候，如果没有声明 catch 代码块，Promise 的异常会被抛出。
    // 只能通过这个方法或者 window.onunhandledrejection 才能捕获到该异常
});


/** todo Promise 异常处理 demo */
let promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('congratulation succeed');
        reject(new Error('.... error'));
    }, 300);
});
promise.then(function(successValue) {
    console.log(value);
}, function(failureReason){

}).finally(function(obj){
    
}).catch(function(error){
    
});


Promise.all([promise1, promise2, promise3]).then(function(values) {
    console.log(values);
});
Promise.race([promise1, promise2]).then(function(value) {
    console.log(value);
    // Both resolve, but promise2 is faster
});


/** todo 捕获 同步代码异常 */
try{

} catch(error){

}

/** todo 解决 跨域 JS 报错只显示 Script Error 的问题
 * 方案：劫持(hijack)原生方法
 * */
const NATIVE_ADD_EVENT_LISTENER = EventTarget.prototype.addEventListener;   // 首先保存原生的添加事件监听的方法
EventTarget.prototype.addEventListener = function (type, func, options) {   // 重写原生方法。
    const hijackFunction = function (...args) { // 将回调函数包裹一层try catch
        try {
            return func.apply(this, args);
        } catch (e) {
            const errorObj = {
                error_name: e.name || '',
                error_msg: e.message || '',
                error_stack: e.stack || (e.error && e.error.stack),
                error_native: e,
            };
            // 接下来可以将errorObj统一进行处理。
            throw e; // 重新 throw 出来异常的时候，执行的是同域代码，所以 window.onerror 捕获的时候不会丢失堆栈信息；
        }
    };
    return NATIVE_ADD_EVENT_LISTENER.call(this, type, hijackFunction, options); // 调用原生的方法，保证addEventListener正确执行
};


/** todo 自定义异常类型 */
function KaseiError(message){
    this.name = 'KaseiError';
    this.message = message ;
    this.stack = (new Error()).stack;
}
KaseiError.prototype = Object.create(Error.prototype);
KaseiError.prototype.constructor = KaseiError;








