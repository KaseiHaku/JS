/** Function Definition */
var func1 = function(x){return x+6;};
var func2 = (x) => x + 6;
/* 动态创建函数
 * 该方法 和 eval() 的区别是: 
 *  new Function() 出来的 function 都是在全局作用域下的，在 web 环境，那么就是 window 对象下的函数。该方法 对性能影响不大，但是同样存在安全隐患，但是相对 eval() 要好很多
 *  evel() 则是在当前 运行 evel() 代码时，所在的作用域. 该方法极不推荐使用，严重降低性能 和 存在安全隐患
 * */
var func3 = new Function("argName1", "argName2", 'alert("Hello " + sName + sMessage);'); 


/** JS 函数中的 this 对象
 * 总结: 
 *      除了 strict 模式下，全局环境调用 func() 时，this 为 undefine，其他位置谁使用 () 调用函数，this 就指向谁
 *      箭头函数: this 不随调用环境改变而改变，永远指向箭头函数定义时，语法环境中的 this, 
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
        return () => console.log(this); // obj.cc()()  this === obj  因为 箭头函数定义时，this 为 cc:function(){} 的 this 
    }
}







/** Closure 闭包
 * 指的是函数可以使用函数之外定义的变量，相当于函数的环境变量，但是该环境变量是根据函数创建时的词法环境决定的。
 * 词法环境：就是源代码上下文环境，即函数创建语句所在的代码位置能访问到的所有变量
 * */
function closureB(){
    alert(msg);
}
function closureA(){
    let msg = 'fa';
    function closureC(){
        alert(msg);
    }

    closureC(); // 正确，因为 C 函数的定义语句的词法环境就能访问 msg 变量
    closureB(); // 报错，因为 B 函数的定义语句的词法环境无法访问 msg 变量
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
    
        
    /** 函数使用方式三：构造器调用 */
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
 * */
async function asyncFunc(){
    const a = await getA(); // await 后面必须是一个 Promise 实例，或者定义了  then() 方法的对象
}








    
