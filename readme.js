/**
JS Primitive Type: 
    string，number，bigint，boolean，null，undefined，symbol 
    在计算机内存中的表现形式为 [ EEEEEEEE, "存放的内容"], 其中 EEEEEEEE 是 内存中每个字节 在 CPU 寻址中的编码地址，
    所以 primitive type 类型的数据是直接保存在内存对应地址的 字节中的，
    一个 primitive type 不一定只保存在一个字节中，可能是多个字节组成，比如 number 可能是 4 个内存地址对应的字节
JS Reference Type: 
    由多个 primitive type 组成
    在计算机内存中的表现形式为  [ FFFFFFFF, "EEEEEEEE(内存地址)"], 其中 EEEEEEEE 是 这个组合出来的 引用类型 在内存中具体的保存位置

只要对事物进行编码，计算机中的 0101 可以表示任何事物，包括但不限于: 数字，字符，声音，图像，CPU指令 等等
JS 的形成：
    1. Primitive Type: 不用形成，内存条中对应地址的字节中保存的内容就是数据
    2. Reference Type: 即 Object 类型
        1. 分配一组内存地址[1~1000](连续 或 不连读 的内存地址都行)，用于保存数据，即：var obj = [1]; 表示 obj 这个变量编译后的内存地址为 1
        2. [1~2] 分配给一个 number 类型，即：obj.num = [1]; 表示 obj 对象中 num 变量指向的内存地址是 1，长度为 2(两个字节，16 bit)
           [3~10] 分配给一个 string 类型，即: obj.str = [3]; 表示 obj 对象中 str 变量指向的内存地址是 3, 长度为 8
           [11~20] 分配给一个 object 类型，即: obj.o = [11]; 由于 object 是引用类型，所以 11~20 中保存的是 o 对象所在的内存地址
           [21~30] 分配给一个 function 类型，即: obj.func = [21]; 由于 function 也是 object 类型(引用类型)，所以 21~30 中保存的是 func 对象所在的内存地址
                function 是特殊的 object，function 所在内存中保存的数据不是 基本类型，也不是内存地址，而是 CPU 指令的编码，
                所以执行 function 时，CPU 会读取 function 中保存的 一系列CPU指令 来完成对数据的操作


*/


/** Chrome 控制台中 [[FunctionLocation]] 双中括号的属性是什么？ 
 * [[property]]  表示这是JavaScript引擎内部使用的属性/方法
 * */


// shell> cd . && node HelloWorld.js -arg 111
console.log(`命令行命令本身： ${process.argv0}`);
console.log(`命令行参数： ${JSON.stringify(process.argv)}`);
console.log('Hello NodeJS');
