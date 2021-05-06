/** Promise 
 * 三种状态： pending, fulfilled, rejected
 * */


/** 创建 Promise 实例 */
let pro = new Promise(function(resolve, reject){  // resolve 和 reject 由 JS 引擎自动填充，不需要自己赋值
    if(success){
        resolve(value);
        return ;
    }
    reject(error);
})
.then(function(resolveCallback){}, function(rejectCallback){})
.catch(function(error){})
.finally(function(){});



Promise.all([p1, p2, p3]);
Promise.race();
Promise.allSettled();
Promise.any();
Promise.resolve();
Promise.reject(reason);
Promise.try();





