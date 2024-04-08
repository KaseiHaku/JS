/** Function Definition */
var func1 = function(x){return x+6;};
var func2 = (x) => x + 6;
/* 动态创建函数
 * 该方法 和 eval() 的区别是: 
 *  new Function() 出来的 function 都是在全局作用域下的，在 web 环境，那么就是 window 对象下的函数。该方法 对性能影响不大，但是同样存在安全隐患，但是相对 eval() 要好很多
 *  evel() 则是在当前 运行 evel() 代码时，所在的作用域. 该方法极不推荐使用，严重降低性能 和 存在安全隐患
 * */
var func3 = new Function("argName1", "argName2", 'alert("Hello " + sName + sMessage);'); 

/* 带默认值的函数 */
function func(x, y='defaultVal'){}
function func(x, y=v+1 ){}   // 默认值是表达式，则每次都计算一遍默认值表达式





/** JS 函数中的 this 对象
 * 总结:
 *  什么是执行环境？就是代码实际运行时的环境，即: runtime 而不是 compile
 *
 *  非严格模式：
 *      1. 任何函数体外部的(全局环境) this 都 === window
 *      2. 直接通过 funcName() 来执行函数，那么该函数内部的 this===window;  
 *  
 *  严格模式:
 *      1. 任何函数体外部的(全局环境) this 都 === window
 *      2. 直接通过 funcName() 来执行函数，那么该函数内部的 this===undefined;
 *      3. obj.funcName() 或 funcName.call(obj, arg1, arg2) 或 funcName.apply(obj, [arg1, arg2]) 来执行函数，函数中的 this===obj
 *      4. let newFunc = funcName.bind(obj);  那么 newFunc 函数中的 this 永远 ===obj，无论 newFunc 以什么样的方式被调用。
 *         即使 let newFunc2 = newFunc.bind(obj2);  通过 bind 重新绑定了 obj2，newFunc2 中的 this 还是 ===obj，而不是 ===obj2，因为 bind 只有第一次有效，不能重复 bind
 *      5. 箭头函数: let arrowFunc = ()=>this;
 *          任何函数体外部的(全局环境) 箭头函数 中的 this===window
 *          obj.arrowFunc() 或 arrowFunc.call(obj, arg1, arg2) 或 arrowFunc.apply(obj, [arg1, arg2]) 来执行函数，obj 参数将会被忽略，函数中的 this===封闭词法执行环境中的 this
 *          函数体 内部的 箭头函数 的 this 继承外部函数的 this
 *
 *  如何判断 this 指针:
 *      function 单看调用方式即可
 *      arrow 先看调用方式，再看 lambda 解释(定义)时，外部环境的 this 是什么，因为 js 是逐行解释的
 * */
this === window;  // true 相当于 let window = { this }, 因为 js 所有 函数 和 对象 都挂在 window 对象下面
function thisFunc(){
    console.log(this);  // 严格模式下为 undefined
}

let obj = {
    aa: function(){
        console.log(this);   // obj.aa()   this === obj
    }
    bb: () => console.log(this);  // obj.bb()  this === window 严格模式下 this === undefined 因为箭头函数外层没有函数包裹，所以 this == window， 严格模式下为 undefined
    cc: function(){
        // obj.cc()();              因为 箭头函数定义时，this 为 cc:function(){} 的 this, 即: this===obj
        // obj.cc.call('aaa')();    这里因为 call 改变了 cc:function(){} 的 this，所以这里 this==='aaa'
        return () => console.log(this); 
    }
}

let newArrowFunc = obj.cc;
newArrowFunc()();       // 这里输出的 this===window，相当于 window.newArrowFunc()();
                        // newArrowFunc() 的 runtime 环境中的 this===window，
                        // 由于 newArrowFunc()() 的 runtime 环境中的 this 继承 newArrowFunc() runtime 环境中的 this
                        // 所以 这里 this===window


/** Closure 闭包
 * 指的是函数可以使用函数之外定义的变量，相当于 函数的环境变量，但是该 环境变量 是根据 函数定义 时的 词法环境 决定的。
 * 词法环境：就是源代码上下文环境，即 函数定义语句 所在的 代码位置 能访问到的 所有变量
 * 闭包的实现原理：
 *     访问某个变量时，如果不存在就 "根据函数定义时的词法环境" 一直向外层寻找。
 *     其实是利用了 作用域链 的特性，我们都知道 作用域链 就是在当前 词法环境 下访问某个变量时，
 *     如果不存在就一直向外层寻找，最终寻找到最外层也就是全局作用域，这样就形成了一个链条。
 *     至于什么是作用域链，你可以将其看成函数嵌套。
 * */
function plainB(){
    alert(msg);
}
function plainA(){
    let msg = 'fa';

    // 定义在 函数 内部的 函数，叫做 闭包函数
    function closureC(){
        alert(msg);
    }

    closureC(); // 正确，因为 C 函数的定义语句的词法环境就能访问 msg 变量
    plainB(); // 报错，因为 B 函数的定义语句的词法环境无法访问 msg 变量
}

/** 嵌套函数变量查询机制
 * 内嵌函数（嵌套类）:实际上，在 JavaScript 中，所有函数都能访问它们上一层的作用域。JavaScript 支持嵌套函数。嵌套函数可以访问上一层的函数变量。
 * */
function add() {
    kasei = "haku";  // 因为当前函数局部变量中不存在 kasei，所以会从外层找，如果到顶层（window 实例）还没有，那么在 window 实例中添加一个属性 kasei，即全局变量 kasei
    var counter = 0;
    function plus() {counter += 1;}
    plus();
    return counter;
}

/** arguments 对象 */
function findMax() {

    var i, max = 0;
    for (i = 0; i < arguments.length; i++){
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    return max;
}
var max = findMax(1, 123, 500, 115, 44, 88);



/** todo JS 函数使用方式总结 ***/
    
    /** 函数使用方式一：函数调用 */
    function beCalled(){
        console.log(this); // 严格模式下为：this === undefined; 不严格模式下为：this === window;
        return 3;
    }
    beCalled();  // 函数调用
    
    
    /** 函数使用方式二：方法调用 */
    var obj = {
        beCalled: function(){
            console.log(this); 
            return 3;
        }
    };
    obj.beCalled();  // 方法调用
    
        
    /** 函数使用方式三：构造器调用 
     * 作为构造器使用时，实际执行的步骤:
     *    创建一个空对象
     *    将这个空对象绑定到函数中的 this 关键字上
     *    设置该对象的__proto__属性指向函数的原型对象（Function.prototype）
     *    执行函数体内的代码，通过this关键字给新创建的对象添加属性和方法
     *    如果该函数没有返回其他对象，则返回新创建的对象(即：this)，否则返回 return 指定的对象
     * */
    function constructorCall(a){
        this.a = a;
        return {}; // 构造函数显示的返回对象
    }
    var obj = new constructorCall('aa'); // 构造器调用
    
    
    /** 函数使用方式四：间接调用
     * call()和apply()方法可以用来间接地调用函数，这两个方法都允许显式指定调用所需的 this 值，也就是说
     * 任何函数可以作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法 
     * bind() 方法也可
     * */
    function indirectCall(x, y){
    
    }
    var obj = {};
    indirectCall.call(obj, x, y); // 间接调用，
    indirectCall.apply(obj, [x, y]);
    let bindedFunc = indirectCall.bind(obj); // bind 返回一个函数备用

    /** 函数使用方式五：自调用函数（匿名内部类） */
    (function(arg_0){})(arg_1);//解释：前半部定义一个未命名的函数，然后最后的括号表示直接调用这个未命名函数,arg_1是实参，值传递给arg_0


/** todo JS 命名函数、匿名函数、箭头函数的区别
 * 命名函数：在函数定义的时候就绑定了函数的执行环境（Context），执行环境可以被 call() apply() bind()  let newFun = namedFunc; 改变
 * 匿名函数：在函数运行时才绑定函数的执行环境，相当于 let newFun = function(){}; 绑定的时机在 newFun(); 的时候
 * 箭头函数：在函数定义时绑定的是父级语法环境中的 this，如果父级 this 改变，那么箭头函数的 this 随之改变
 * */

/** 定义一个 Generator 
 * yield 表达式只能用在 Generator 函数里面
 * 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值
 * yield* 表达式，用于在 Generator 中调用另一个 Generator 
 * yield 表达式如果用在另一个表达式之中，必须放在圆括号里面。用作函数参数或放在赋值表达式的右边，可以不加括号
 * */
function* generator(){
    try{
        yield 'hello';   // yield 表示屈服，让位，即：让出当前线程的执行权，给另一个线程
        yield 'world';
        return 'ending';
    }
    catch(){
    
    }
}

/** 定义一个 Generator */
let gen = generator();
let state = gen.next();     // {value: 'hello', done: false}
let state = gen.next();     // {value: 'world', done: false}
let state = gen.next();     // {value: 'ending', done: true}
let state = gen.next();     // {value: undefined, done: true}
let state = gen.next(true);     // next() 方法的参数用于作为上一 yield 表达式的返回值，即：let result = yield xxx;  result = true;
gen.throw(obj);  // 可以被 generator 内部的 try-catch 捕获

/** Thunk 函数： 
 * call by value(传值调用): f(x+5);     其中 x+5 在进入函数前就已经计算完毕
 * call by name(传名调用): f(x+5);      其中传给 函数的是 x+5 整个表达式，只有在实际用到时，才对 x+5 做求值运算
 * 编译器如何实现 传名调用？
 *      将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数
 *
 * JS 中的  Thunk 函数定义跟上文的中不同，JS 中 Thunk 函数指：只接受回调函数作为参数的函数，类似于 java 中 Currying(柯里化)
 * */



/** async 函数：Generator 函数的语法糖 
 * 将 function* 替换成 async，将 yield 替换成 await
 * async 函数返回一个 Promise 实例
 * 执行顺序:
 *  1. async 函数一旦遇到 await 就会先返回，等到异步操作完成，在接着执行函数体内后面的代码
 *  2. async 函数返回的 Promise 对象，必须等到内部所有 await 命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到 return 语句或者抛出错误。
 * 原理:
 *  async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。
 * @trap
 *     - 调用一个 async func() 相当于 new Promise();
 *       return 后面的值，作为 Promise 的 resolve 值
 *       throw  后面的值，作为 Promise 的 reject  值 
 *       如果 return new Promise();  那么 async func() 最终返回值为 Promise().then(promise2 => {}); promise2 为 return 后面的 Promise
 *
 * */
async function asyncFunc(){
    const a = await getA();         // await 后面必须是一个 Promise 实例，或者定义了  then() 方法的对象
    const b = await 'string';       // await 后面跟一个 原始类型，会自动转成 Promise.resolve('string');
    const c = await Promise.resolve(false);          // await 表达式的返回值就是 Promise resolve 的参数，所以这里 c === false 
    await Promise.reject('error');  // await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到
                                    // 任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会中断执行
    
    
    
    /** await 后面 Promise reject 还继续执行 async 函数后续代码的方法 */
    /* 方案一: try catch 包含 await  */
    try {
        await Promise.reject('出错了');
    } catch(e) {
    }
    return await Promise.resolve('hello world');
    /* 方案二: await 后面的 Promise 对象再跟一个 catch 方法 */
    await Promise.reject('出错了').catch(e => console.log(e));
    return await Promise.resolve('hello world');
    
    /** async 函数错误处理机制 */
    return 'string';                // async 函数内部的 return 语句返回的值，会成为 then 方法回调函数的参数
    
    throw new Error('error');       // async函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到 
}

/* async 函数原理：就是将 Generator 函数和自动执行器，包装在一个函数里 */
async function func(){args}             // 等同于下面函数
function func(args){
    return spawn(function* (){          // 匿名 Generator 函数
        
    });
}


/* 并发调用只返回一个的结果，其他的共用第一个的结果 
 * 实现原理: 所有 调用 都返回一个 单例的 Promise 对象作为结果 即可
 * */
async function inner(){
  await setTimeout(()=> {
    console.log(3333);
  }, 2000);
  return true;
}

let blockSingletonPromiseResult = null;  // 单例的 Promise 结果
function innerConcurrentBlock(){
  if(blockSingletonPromiseResult){
    console.log(111111);
    return blockSingletonPromiseResult;
  }
  blockSingletonPromiseResult = new Promise((resolve, reject) => {
    inner().then(value => {
      console.log(2222);
      resolve(value)
    }).catch(reason => {
      reject(reason);
    });
  }).finally(() => {
    blockSingletonPromiseResult = null;
  });
  return blockSingletonPromiseResult;
}

function main(){
  for(let i=0; i<10; i++){
    innerConcurrentBlock();
  }
}
main();



/** Class
 * 
 *
 */
/** ES5 */
function Point(x, y){
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function(){
    return '(' + this.x + ',' + this.y + ')';
}
var p = new Point(1, 2);
/** ES6 ES2015
 * class Point{} 基本等价于 function Point(){}
 */
class Point {
    
    xx = '另一种属性定义方式';
    static yy = 1234;
    
    /** 在 class 内部的方法，都默认定义在 Point.prototype 上，而不是定义在 class 内部本身 */
    toString() {
        return '(' + this.x + ', ' + this.y + ')';
    }
    
    static func(){}
    
    /** 
     * 一般 constructor 会写在第一个，但是实际执行逻辑是：上面的 prototype 相关的定义先执行，在 new 的时候才执行 constructor 函数
     * 所以这里 constructor 写在最后，用于表示实际执行逻辑的顺序
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


    
