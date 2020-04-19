// shell> cd . && node HelloWorld.js -arg 111
console.log(`命令行命令本身： ${process.argv0}`);
console.log(`命令行参数： ${JSON.stringify(process.argv)}`);
console.log('Hello NodeJS');