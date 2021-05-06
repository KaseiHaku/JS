/** 定义一个 Generator 
 * yield 表达式只能用在 Generator 函数里面
 * 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值
 * yield* 表达式，用于在 Generator 中调用另一个 Generator 
 * yield 表达式如果用在另一个表达式之中，必须放在圆括号里面。用作函数参数或放在赋值表达式的右边，可以不加括号
 * */
function* generator(){
    yield 'hello'; 
    yield 'world';
    return 'ending';
}

/** 定义一个 Generator */
let gen = generator();
let state = gen.next();     // {value: 'hello', done: false}
let state = gen.next();     // {value: 'world', done: false}
let state = gen.next();     // {value: 'ending', done: true}
let state = gen.next();     // {value: undefined, done: true}
let state = gen.next(true);     // next() 方法的参数用于作为上一 yield 表达式的返回值，即：let result = yield xxx;  result = true;



/** async 函数：Generator 函数的语法糖 
 * 将 function* 替换成 async，将 yield 替换成 await
 * */
async function asyncFunc(){
    const a = await getA();
}







