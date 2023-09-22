/** Promise 
 * 三种状态： pending, fulfilled, rejected
 * */


new Promise(function(resolve, reject){
        resolve(333);
    })
    .then(function(resolveCallback){}, function(rejectCallback){})
    // catch 方法是 .then(null, rejection) 或 .then(undefined, rejection) 的别名，用于指定发生错误时的回调函数
    .catch(function(error){})
    .finally(function(){});

/** 创建 Promise 实例 */
let promise = new Promise(function(resolve, reject){  // resolve 和 reject 由 JS 引擎自动填充，不需要自己赋值
    if(success){
        resolve(value);
        return ;
    }
    reject(error);
});

// 如果 param 是一个 Promise 对象，那么 Promise.resolve() 不做任何修改，直接返回
// 如果 param 是一个 thenable 对象（具有 then 方法的对象），Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法
// 参数不是具有then()方法的对象，或根本就不是对象：将该对象转成 promise 对象，状态为 resolved，值为对象本身
// 不带有任何参数：注意: 立即 resolve() 的 Promise 对象，是在 本轮事件循环 的结束时执行，而 setTimeout() 是在 下一轮事件循环 开始时执行
Promise.resolve(param);
Promise.reject(reason); // 同 Promise.resolve();


/* 异常处理 */
new Promise( (resolve, reject)=>reject(2222) )
    .catch( err => { });


/* 不管同步函数 还是 异步函数，都用 Promise 来处理它 */
let func = ()=>console.log(222);
let funcPromise = Promise.resolve().then(func);  // 这样 funcPromise 中的值就是 func 的 return value，缺点：func 在本轮事件循环 结束时执行






/** 多个 Promise  */
Promise.all([p1, p2, p3]); // 所有都成功才算成功，否则失败
Promise.race(); // 外层，根据 状态最先改变的 Promise
Promise.allSettled(); // 不管成功失败，所有 Promise 都结束
Promise.any(); // 有一个成功就成功，只有所有都失败，才失败



/* 让同步函数同步执行，异步函数异步执行 */
let func = ()=>console.log(222);
// 写法一
(async () => func())();  // 如果 func 是同步函数，那么就同步执行，如果是异步函数就异步执行
// 写法二
(
    () => new Promise(
    resolve => resolve(func())   // resolve(func()) 返回 func() 的返回值
  )
)();
// 写法三
Promise.try(func()); // 提案，未实装



