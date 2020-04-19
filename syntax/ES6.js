/** todo ES6 主要知识点
 * 反引号字符串
 * 解构
 * Iterator Generator yield Thunk for...of
 * Promise
 * Proxy: 元编程
 * Reflect
 * async 函数
 * Class
 * Module
 * */







/** todo Reserved word */

/** todo Variable: let, const, class 声明的变量不再是 window 对象的属性 */
const PI = 3.1415926; // 声明一个 const 常量，对值类型，不能改变值；对引用类型，不能改变引用地址
const [a, b, c] = [1, 2, 3]; // 采用解构的方式声明多个 const 变量


const b = `foo${a}bar`;  // ES6 中所有字符串都是用 ` 反引号
function func(){}  // 声明一个 function 变量
let var3 = 'abc', var4 = 45.6; // let 命令声明的变量，只在 let 命令所在的代码块内有效；let 变量必须先声明后使用，且不允许重复声明

import aa;
class Kasei;

/** 暂时性死区 */
/* todo 案例一 */
var tmp = 123;
if (true) {
    tmp = 'abc'; // ReferenceError，因为 let 命令使 tmp 变量绑定到当前语句块，并且 let 变量必须先声明后使用，所以报错
    let tmp;
}
/* todo 案例二 */
function bar(x = y, y = 2) {
    return [x, y];
}
bar(); // 报错，因为函数参数默认是 let 变量，并在出现时声明，y 在 x 变量之后出现，如果反过来就不报错了

/** todo Destructuring: 如果解构不成功，变量的值就等于 undefined */






/** todo JS 中表示一个字符 */
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true

/** todo 程序走向 */
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
    console.log(key + " is " + value);
}
// first is hello
// second is world

/** todo iterate 迭代语法 */
/** ES5 语法：定义一个迭代器生成函数 */
function customNewGenerator(array) {
    var nextIndex = 0;
    return {
        next: function() {             // 由于 JS 闭包，该方法能访问定义时词法环境的上下文，即 nextIndex 变量
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {value: undefined, done: true};
        }
    };
}


/** ES6 语法：定义一个迭代器生成函数 */
function* createNewGenerator(){
    /** yield 关键字详解
     * result === iterator.next() === {value: val, done: false}
     * nextParm: 表示的是  iterator.next(param); 中的参数 param
     * */
    let nextParam = yield result;
    let nextParam = yield* [1,2,3]; // yield* 后面必须跟实现了 Iterator 接口的类型
}

/** 原生迭代器生成函数存在位置 */
let ary = [1,2,3];
let iter = ary[Symbol.iterator]();  // 获取一个原生对象的迭代器，相当于上面的迭代器生成函数
let iter = createNewGenerator();
let iter = customNewGenerator(ary);

/**  */




