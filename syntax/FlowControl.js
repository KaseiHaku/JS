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

// 遍历具有 Symbol.iterator 属性的 obj
for(let value of ary){
    console.log(value);
}

