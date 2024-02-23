/******************************* 扩展运算符(ES2018) *******************************/
// 对数组使用 ...
[1,..[4,5],2,3] === [1,4,5,2,3] 

// 对象解构时，使用 ... 
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }; 
x // 1
y // 2
z // { a: 3, b: 4 }



// 用于函数的 rest 参数，rest 是一个 array ，包含所有剩余的参数
function func(param1, param2, ...rest){
  arguments;   // rest 和 arguments 类似，只是 arguments 包含所有入参，而 rest 只包含除 param1, param2 外的入参
}



/******************************* 指数运算符 *******************************/
2**3 == 8

/******************************* 链判断运算符(ES2020) *******************************/
// 读取 message.body.user.firstName 属性，没有则返回默认值
const firstNameErr = message.body.user.firstName || 'default';  // 错误写法
const firstNameCorrect = (message && message.body && message.body.user && message.body.user.firstName) || 'default'; // 正确写法
const firstNameChain = message?.body?.user?.firstName || 'default'; // 链式写法

/******************************* Null 判断运算符(ES2020) ********************************
 * 只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值
 * @trap 由于 ?? 和 && || 共用时，必须使用 () 区分
 *       即: lhs && middle ?? rhs     会报错，必须这么写: lhs && (middle ?? rhs) 或者 (lhs && middle) ?? rhs 
 * */
const firstNameChain = message?.body?.user?.firstName || 'default'; // 链式写法，问题是 message.body.user.firstName 的值如果为 空字符串 或 false 或 0，默认值也会生效
const firstNameChainOnlyNull = message?.body?.user?.firstName ?? 'Hello, world!'; // 使用 ?? ，如果值为 空字符串 或 false 或 0，则不会返回 'Hello, world!'，而是返回原始值

/******************************* 逻辑赋值运算符(ES2021) *******************************/
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)

// 用途1：给变量赋默认值
user.id = user.id || 1;  // 老写法
user.id ||= 1;  // 新的写法
opts.baz ?? (opts.baz = 'qux'); // 老写法
opts.baz ??= 'qux'; // 新写法



/******************************* #!命令(ES2023) ********************************
 * 写在脚本文件第一行，有这行后可以直接 shell> ./hello.js 执行脚本，而不用像以前一样 shell> node ./hello.js
 * */
#!/usr/bin/env node
