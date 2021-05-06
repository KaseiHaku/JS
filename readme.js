/** Chrome 控制台中 [[FunctionLocation]] 双中括号的属性是什么？ 
 * [[property]]  表示这是JavaScript引擎内部使用的属性/方法
 * */


// shell> cd . && node HelloWorld.js -arg 111
console.log(`命令行命令本身： ${process.argv0}`);
console.log(`命令行参数： ${JSON.stringify(process.argv)}`);
console.log('Hello NodeJS');
