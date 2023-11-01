/****************************** ECMA Script Syntax Demo ******************************/



/****************************** Symbol 
 * 主要作用是作为其他 obj 的 key，
 * @trap Symbol 不是对象，仅仅代表一个 内存地址，即 [address:content] = [symbol:content]
 * */
let symbol = Symbol('current symbol description, just for reveal, has no practical meaning');
symbol.toString(); // 'Symbol(description)'
symbol.description; // 'description'


/****************************** Proxy
 * Proxy 一共支持拦截 13 种操作
 * */
let proxyTarget = { aa:'a1' };
let proxy = new Proxy(proxyTarget, {
    get: function (target, propKey, receiver) {
        console.log(`getting ${propKey}!`);
        return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
        console.log(`setting ${propKey}!`);
        return Reflect.set(target, propKey, value, receiver);
    }
});

proxyTarget.aa = 'a2'; // 绕过代理，直接调用目标对象，不会触发 getter, setter
proxy.aa = 'a3';
console.log(proxy.aa);

/****************************** Reflect
 * 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty ），放到 Reflect 对象上
 * */


/****************************** Promise
 * 
 * */



/****************************** Generator
 *
 * */
function* gen(){
    yield 'asd';  // yield 产出
    yield 222;
    return false;
}
let genExecutor = gen();  // 执行 Generator 函数不是返回 return 值，而是返回一个执行器
/* 执行 next() 方法，返回 yield express; 中 express 的返回值 
 * 执行 next(value) 时，value 会传入 Generator 内部，并作为 yield express; 语句整体的返回值，
 *      即: 当 let yieldRet = yield express; 时，yieldRet === value
 * */
console.log(genExecutor.next()); 
// console.log(genExecutor.throw(new Error('gen error'))); // 直接抛异常
// console.log(genExecutor.return(true)); // 直接结束当前 executor 
console.log(genExecutor.next()); // next() 传入的参数将用作上次 yield 表达式的返回值
console.log(genExecutor.next());


/****************************** async function
 *
 * */
async function aa(){
    return new Promise(resolve => {
        setTimeout(function(){resolve('resolve');}, 5 * 1000);
    });
}

aa().then(value => console.log(value));
console.log(2222);


/****************************** Class 
 *
 * */


/****************************** Module
 *
 * */
