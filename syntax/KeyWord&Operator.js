/** TODO Key Word */
var aa;
var a = void(5); // void 是 JavaScript 中非常重要的关键字，该操作符表示：计算一个表达式，但是不管结果如何都返回 undefined
typeof "John"                // 返回 string
"attributeName" in obj      // 判断一个对象是否有这个属性
delete obj.attributeName    // 删除对象的一个属性
var person = null;           // 值为 null(空), 但类型为对象
var person = undefined;     // 值为 undefined, 类型为 undefined

debugger;   // JS 代码触发 debug 当浏览器打断点无效时使用


/** TODO
 * const 关键字修饰的变量，不能对其值做修改，否则报错。
 * @attention 变量分为 存值变量（基本类型的变量）， 存地址变量（即指针：对象/数组类型的变量）
 * */


const PI = 3.1415926; // PI 是 存值变量
PI = 2; // 该行报错，因为 PI 是 存值变量 ，该操作修改了 PI 变量的内容


const ary = [1, 2]; // ary 是 存地址变量
ary[0]= 2; // 该行不报错，因为该行代码并没有修改 ary 变量所保存的地址

/** TODO Operator
 * ===     // 绝对等于（值和类型均相等）
 * !==     // 绝对不等于（值和类型有一个不相等，或两个都不相等）
 *
 *
 *
 *
 */






