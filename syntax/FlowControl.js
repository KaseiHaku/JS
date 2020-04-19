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
outer:
    for(var i=0;;i++){
        inter:
            for(var j=0;;j++){
                break inter;
                break outer;
                continue inter;
                continue outer;
            }
    }
