/** TODO 导包 */
let bash = require('child_process'); // nodejs 执行 bash 需要引入的包



/** TODO global 相当于 web 环境下的 window */
global.console.log('global just like window in browser');

bash.exec('ls --dd', (execException, stdout, stderr)=>{
    console.log(stdout);
    console.log(stderr);
    if (execException !== null) {
        console.log('-------------------');
        console.log(execException);
    }
});


