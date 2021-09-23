/** JS 数据类型 */
Undefined
Null
Boolean
Number
String
Symbol
Object
Array
Function

/** JS 判断对象类型的方法 */
// typeof
typeof undefined;           // 'undefined'
typeof null;                // 'object'
typeof false;               // 'boolean'
typeof 1;                   // 'number'
typeof NaN;                 // 'number'
typeof 'str';               // 'string'
typeof Symbol();            // 'symbol'
typeof {};                  // 'object'
typeof [];                  // 'object'
typeof function(){};        // 'function'

// instanceof
undefined instanceof Undefined;         // error 没有 Undefined 类型
null instanceof Null;                   // error 没有 Null 类型
false instanceof Boolean;               // false
2 instanceof Number;                    // false
NaN instanceof Number;                  // false
'str' instanceof String;                // false，必须是 new String() 出来的实例才能用 instanceof 判断
Symbol() instanceof Symbol;              
{} instanceof Object;                   // true
[] instanceof Array;                    // true
function(){} instanceof Function;       // true

// Object.prototype.toString.call(obj);
Object.prototype.toString.call(undefined);          // "[object Undefined]"
Object.prototype.toString.call(null);               // "[object Null]"
Object.prototype.toString.call(true);               // "[object Boolean]"
Object.prototype.toString.call(1);                  // "[object Number]"
Object.prototype.toString.call(NaN);                // "[object Number]"
Object.prototype.toString.call("str");              // "[object String]"
Object.prototype.toString.call(Symbol());           // "[object Symbol]"
Object.prototype.toString.call({});                 // "[object Object]"
Object.prototype.toString.call([]);                 // "[object Array]"
Object.prototype.toString.call(function a() {});    // "[object Function]"

// obj.constructor.toString();
undefined.constructor.toString();                   // Uncaught TypeError: 
null.constructor.toString();                        // Uncaught TypeError: 


