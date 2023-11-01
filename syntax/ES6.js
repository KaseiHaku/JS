/******************************** Operators ********************************
 * ===              // 绝对等于（值和类型均相等）
 * !==              // 绝对不等于（值和类型有一个不相等，或两个都不相等）
 * ...              // 扩展 或 剩余参数 运算符，用于将一个数组转为用逗号分隔的参数序列，取出对象的所有可遍历属性，拷贝到当前对象(变量)之中
 * []               // 数组声明 或 动态对象属性名 运算符
 * =                // 赋值 运算符
 * */


// ...  spread or rest param operator     
let originalAry = [1,2,4];
let copiedAry = [...originalAry];  // 使用 rest 剩余扩展运算符 复制数组
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5;  ... spread 扩展运算符：将一个数组转为用逗号分隔的参数序列
let a = (0, 1+2, 4/2);   // 逗号表达式，只返回最后一个表达式的结果赋值给左边

let originalObj = {a:1, b:2};
let mergedObj = {...originalObj, c:3}; // ... spread 扩展运算符：将一个对象的字段展开，合并入另一个对象


/******************************** Keywords ********************************/
/** var let */
var aa;
var a = void(5); // void 是 JavaScript 中非常重要的关键字，该操作符表示：计算一个表达式，但是不管结果如何都返回 undefined

"attributeName" in obj      // 判断一个对象是否有这个属性
delete obj.attributeName    // 删除对象的一个属性
var person = null;           // 值为 null(空), 但类型为对象
var person = undefined;     // 值为 undefined, 类型为 undefined

/** debugger */
debugger;   // JS 代码触发 debug 当浏览器打断点无效时使用

/** const 关键字修饰的变量，不能对其值做修改，否则报错。
 * @attention 变量分为 存值变量（基本类型的变量）， 存地址变量（即指针：对象/数组类型的变量）
 * */
const PI = 3.1415926; // PI 是 存值变量
PI = 2; // 该行报错，因为 PI 是 存值变量 ，该操作修改了 PI 变量的内容

const ary = [1, 2]; // ary 是 存地址变量
ary[0]= 2; // 该行不报错，因为该行代码并没有修改 ary 变量所保存的地址


/** type */
typeof "John"               // 判断是不是基础类型的或者对象，或者是函数：string, number, boolean, undefined, object(null), function
'' instanceof String        // 判断某一个对象是不是某一个构造函数的实例。此处为 false，因为 '' 不是通过 String 构造函数生成的
Object.prototype.toString.call(new f())     // 区分内置对象和自定义对象
constructorFunc.toString().match(/function(.*)\(.*/)[1].trim() // 根据构造函数名，得到自定义对象的具体的类型的字符串

/******************************** String ********************************/
/** todo JS 中表示一个字符 */
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true

const b = `foo${a}bar`;  // ES6 中所有 模板字符串 都是用 ` 反引号

/******************************** Variable ********************************/
/** todo Variable: let, const, class 声明的变量不再是 window 对象的属性 */
var var0 = false; // var 关键字
let var3 = 'abc', var4 = 45.6; // let 命令声明的变量，只在 let 命令所在的代码块内有效；let 变量必须先声明后使用，且不允许重复声明
const PI = 3.1415926; // 声明一个 const 常量，对值类型，不能改变值；对引用类型，不能改变引用地址
const [a, b, c] = [1, 2, 3]; // 采用解构的方式声明多个 const 变量
const sym = Symbol('foo'); // Synmbol 是一个随机值，可以用作 obj 的 key ，比如 obj[sym] = true;  但是不能使用 obj.sym 因为 obj.sym 相当与 obj['sym']
function func(){}  // 声明一个 function 变量


import aa from module;
class Kasei{
    [dynamicPropertyName]: false;
    [dynamicFunctionName](){
        console.log('demo');
    }
};

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

/******************************** Destructuring 解构 ********************************
 * 什么是 解构：
 *  构造函数的作用是：将多个 变量 组合成一个对象，所以解构的作用是：将一个 对象 解构成多个 变量
 * 坑：
 *  解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本
 *  只能解构 对象；其中 数组是特殊的对象，基本类型是包装对象
 *  解构只能 解 目标对象自身的所有可遍历的（enumerable）
 *  
 * 解构中的 小括号() 问题：
 *  原则：尽量不要在模式中使用 () 
 *  可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。 
 *      let [(a)] = [1]; // 报错，因为有 let 是变量声明语句
 *      function f([(z)]) { return z; } // 报错，因为 函数参数 也属于变量声明
 *      ({ p: a }) = { p: 42 };  // 报错，因为不能将模式，或者模式的一部分放在 () 中
 *      ({ p: (d) } = {}); // 正确，因为 d 不属于模式，而是默认值
 *  
 * */

/** 基本类型 当做 对象 解构成 变量
 * 数值和布尔值的解构赋值: 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象，数值和布尔值都有对应的包装对象，跟 java 中的包装类类似
 * */
let {toString: s1} = 123;
console.log(s1 === Number.prototype.toString); // true
let {toString: s2} = true;
console.log(s2 === Boolean.prototype.toString); // true


/** 字符串 当做 数组 解构成 变量 */
const [a, b, c] = '123'; // a='1'; b='2'; c='3'
/** 字符串 当做 对象 解构成 变量 */
let {length : len} = 'hello'; // len=5;


/** 数组 当做 数组 解构成 变量
 * 只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
 * */
console.log('\n数组 解构成 变量 ==============');
let [foo, [[bar], baz]] = [1, [[2], 3]]; // foo=1; bar=2; baz=3
let [ , , third = 'defaultValue'] = ["foo", "bar", "baz"]; // third="baz"; 解构使用默认值，如果右边不是 === 全等于 undefined，那么默认值不生效
let [x, , y] = [1, 2, 3]; // x=1; y=3
let [head, ...tail] = [1, 2, 3, 4]; // head=1; tail=[2,3,4]
let [x, y, ...z] = ['a']; // x='a'; y=undefined; z=[]
let [foo] = NaN; // 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错
/** 数组当做 对象 解构成 变量 */
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr; // first=1; last=3;


/** 对象 当做 对象 解构成 变量，对象当做对象是废话 */
console.log('\n对象 解构成 变量 ==============');
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };  // x=1, y=2, z={a:3, b:4}
let { x, ...z, y } = { x: 1, y: 2, a: 3, b: 4 };  // ...z 解构必须是最后一个参数，且同时只能有一个
let {...z} = null;
let {...z} = undefined;

// ({ foo: tty = 'defaultValue', bar: bar } = { foo: "aaa", bar: "bbb" }); // 单单解构
// let { foo: tty, bar: bar } = { foo: "aaa", bar: "bbb" };  // 解构的同时声明变量； tty 才是解构出来的变量，这种形式用于解构出来的变量名和对象字段名不一致的情况





/** 函数参数的解构赋值 */
function add([x, y]){
  return x + y;
}
add([1, 2]); // 3


function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]





/******************************** FlowControl 流向控制 ********************************/
// if
if (false) { // 值: undefined, null, 0, -0, 0.0, NaN,  "", false 在 if 判断中，都认为是 false
    console.log('if');
} else if (true) {
    console.log('if else');
} else {
    console.log('else');
}


// switch
switch (param) {
    case 1:
        console.log(1);
        break;
    case 2:
        console.log(2);
        break;
    default:
        console.log(0);
}


// js 循环
outer:for(var i=0;;i++){
    inter:for(var j=0;;j++){
            break inter;
            break outer;
            continue inter;
            continue outer;
        }
}

// 遍历 obj 的 keyName
for(let key in obj){ // 遍历对象的 key 
    console.log(key);
}

var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) { // 遍历对象的 key value，对象必须部署 Symbol.iterator 属性
    console.log(key + " is " + value);
}
for(let [, value] of map){} // 获取 map 中的 value

// first is hello
// second is world


/* 遍历具有 Symbol.iterator 属性的 obj, 
 * 如果 obj 是 Generator 函数运行时生成的 Iterator 对象，那么不需要调用 Generator 的 next 方法就可以完成遍历
 * */
for(let value of obj){
    console.log(value);
}

// 遍历 异步迭代器
async function* asyncIterator(){
    yield 1;
    yield 2;
}

(async function() {
  for await (const num of asyncIterator()) {
    console.log(num);
    // Expected output: 1

    break; // Closes iterator, triggers return
  }
})();



/******************************** Function ********************************
 * 函数中间的参数即使设置了 默认值，也是不能省略的，函数参数只有尾部参数可以省略，中间参数如果要使用默认值，那么传入 undefined 即可，不能传入 null
 * */
function func(param1 = defaultParam1){} 
const arrowFunc = () => {};

function func(param1, param2, ...paramN){} // 这里的 ... 叫 rest 参数， rest 参数必须是参数列表中的最后一个参数
func(1,2, ...['a', 'c']); // 这里的 ... 叫 spread 扩展运算符，将一个数组转为用逗号分隔的参数序列

/******************************** Generator ********************************/
function* genFunc(){
    yield expression1;
    yield expression2;
}

// async function 等价于 function* 
async function genFunc(){
    await expression1;
    await expression2;
}



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


/******************************** Module ********************************
 * 尽量不要同时使用 named export 和 default export
 * import 导入的值都是只读的
 * */

// named export: 一个模块可以导出 n 个
export let name1, name2, …, nameN; // 导出变量
export function functionName(){...}; // 导出方法
export class ClassName {...}; // 导出类
export name1; // 导出单个变量
export { name1, name2, …, nameN }; // 将多个变量封装成一个 obj，导出

// default export: 一个模块最多只有 1 个， 
// export default expression; 相当于 export default = expression;
export default expression; // 默认导出 expression 的计算结果
export default var1; // 默认导出 变量
export default function(){...} // 默认导出 方法
export default class {...} // 默认导出 类
export default { name1, name2, …, nameN }; // 将多个变量封装成一个 obj，并 default 导出
export {name1, name2 as default}; // name2 为 default 导出
       
// aggregating export: 聚合导出
export * from module; // @trap 它只会重新导出命名导出项，而不会导出默认导出项（Default export）。如果有默认导出项，需要单独导出或使用其他导出语法。
export {name1, name2, ..., nameN} from module; // 导出 module 中指定的 命名导出
export {default as moduleA, ...} from module;  // 聚合导出 module 的默认导出


// import 
// import 导入的变量都是只读的，
// 虽然导入的变量都是只读的，不能修改该变量的内容，但是由于 import 导入实际是传引用，所以不妨碍修改引用的引用，
// 即：importVar.ref = false; 是可以的，仅仅是 importVar = 'xxx'; 不行而已; 类似于 java 中的 lambda 表达式中的变量，需要套一层才能修改
import defaultExport from 'module-name';  // 导入指定模块，默认导出的内容
import * as myModule from 'module-name';  // 导入指定模块所有的导出，并绑定到 myModule 变量中，注意这里并不导入 默认导出
import defaultExport，* as myModule from 'module-name';  // 导入指定模块所有的导出，并绑定到 myModule 变量中，导入 默认导出 绑定到 defaultExport 上
import {export1, export2} from 'module-name';  // 导入指定模块指定的导出，并绑定到 export1 和 export2 变量上
import defaultExport，{export1, export2} from 'module-name';  // 导入指定模块 默认导出 和 指定的导出 的内容，并绑定到 defaultExport， export1 和 export2 变量上
import 'module-name';  // 仅仅运行 导入模块中 的 global 代码， 但是不导入任何值
var promise = import("module-name").then( module => {}); // 动态导入，可以进行代码编写                                       



