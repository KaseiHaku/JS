/** js 变量类型判断工具 */
//得到x的类型,返回类型名称
function getType(x) {
    var str = Object.prototype.toString.call(x);
    class2Type = {
        '[object Undefined]' : 'Undefined',
        '[object Null]' : 'Null',
        '[object String]' : 'String',
        '[object Boolean]' : 'Boolean',
        '[object Number]' : 'Number',
        '[object Object]' : 'Object',
        '[object Symbol]' : 'Symbol',

        '[object Function]': 'Function',
        '[object Array]'  : 'Array',
        '[object Date]'  : 'Date',
        '[object RegExp]' : 'RegExp',

        '[object Error]'  : 'Error'
    }

    // 如果是函数则返回
    if (typeof x == "function"){
        var reg = /\W*function\s+([\w\$]+)\s*\(/;
        var name = reg.exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    }

    return class2Type[str];
}