// if
if (false) {
    console.log('if');
} else if (true) {
    console.log('if else');
} else {
    console.log('else');
}


// switch
switch (param) {
    case 1:
        console.log(1);
        break;
    case 2:
        console.log(2);
        break;
    default:
        console.log(0);
}


// js 循环
outer:for(var i=0;;i++){
    inter:for(var j=0;;j++){
            break inter;
            break outer;
            continue inter;
            continue outer;
        }
}

// 遍历 obj 的 keyName
for(const key in obj){
    console.log(key);
}

/* 遍历具有 Symbol.iterator 属性的 obj, 
 * 如果 obj 是 Generator 函数运行时生成的 Iterator 对象，那么不需要调用 Generator 的 next 方法就可以完成遍历
 * */
for(let value of obj){
    console.log(value);
}

