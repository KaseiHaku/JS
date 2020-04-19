/** 基本类型 解构成 对象
 * 数值和布尔值的解构赋值: 解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象，数值和布尔值都有对应的包装对象，跟 java 中的包装类类似
 * */
console.log('\n基本类型 解构成 对象 ==============');
let {toString: s1} = 123;
console.log(s1 === Number.prototype.toString); // true

let {toString: s2} = true;
console.log(s2 === Boolean.prototype.toString); // true


/** 字符串 解构成 数组 */
console.log('\n字符串 解构成 数组 ==============');
const [a, b, c] = '123'; // a='1'; b='2'; c='3'


/** 字符串 解构成 对象 */
console.log('\n字符串 解构成 对象 ==============');
let {length : len} = 'hello'; // len=5;


/** 数组 解构成 数组 */
console.log('\n数组 解构成 数组 ==============');
// let [foo, [[bar], baz]] = [1, [[2], 3]]; // foo=1; bar=2; baz=3
// let [ , , third = 'defaultValue'] = ["foo", "bar", "baz"]; // third="baz"; 解构使用默认值，如果右边不是 === 全等于 undefined，那么默认值不生效
// let [x, , y] = [1, 2, 3]; // x=1; y=3
// let [head, ...tail] = [1, 2, 3, 4]; // head=1; tail=[2,3,4]
// let [x, y, ...z] = ['a']; // x='a'; y=undefined; z=[]
// let [foo] = NaN; // 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错



/** 对象 解构成 对象 */
console.log('\n对象 解构成 对象 ==============');
// ({ foo: tty = 'defaultValue', bar: bar } = { foo: "aaa", bar: "bbb" }); // 单单解构
// let { foo: tty, bar: bar } = { foo: "aaa", bar: "bbb" };  // 解构的同时声明变量； tty 才是解构出来的变量，这种形式用于解构出来的变量名和对象字段名不一致的情况



/** 数组 解构成 对象 */
console.log('\n数组 解构成 对象 ==============');
var arr = [1, 2, 3];
var {0 : first, [arr.length - 1] : last} = arr; // first=1; last=3;


/** 解构中的 小括号() 问题：原则：不能在模式中使用 () ,只能使用在变量上 */