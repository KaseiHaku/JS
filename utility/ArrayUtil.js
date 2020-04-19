/** TODO 数组判重
 * */
function hasRepeat(ary){
    var obj = new Object();
    for(var i=0; i<ary.length; i++){
        if(!obj[ary[i]]){
            obj[ary[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
}

/** todo 数组去重
 * @theory 原理：根据 js 对象属性的可自由添加及唯一性作为去重依据
 * @algorithm 算法：
 * @trap 坑：该方法会认为 112 和 "112", true 和 "true" 等重复
 * */
function removeDuplicate0(duplicateAry){
    var result = new Array();
    var obj = new Object();
    for(var i=0; i<duplicateAry.length; i++){
        if(!obj[duplicateAry[i]]){
            // 如果取不到对象的属性
            result.push(duplicateAry[i]);
            obj[duplicateAry[i]] = 1;
        }
    }
    return result;
}

/** todo 数组去重
 * @Param array 需要去重的数组
 * @Return 去重后的新数组
 * */
function removeDuplicate1(array){
    var temp = [];
    var index = [];
    var l = array.length;
    for(var i = 0; i < l; i++) {
        for(var j = i + 1; j < l; j++){
            if (array[i] === array[j]){
                i++;
                j = i;
            }
        }
        temp.push(array[i]);
        index.push(i);
    }
    console.log(index);
    return temp;
};


/**
 * TODO 判断当前参数是否存在数组里
 * @param ary 判断的数组
 * @param element 用于判断的元素
 * */
function contain(ary, element){
    var i = ary.length;
    while(i--) {
        if(ary[i] === element) {
            return i;
        }
    }
    return -1;
}

/** todo 删除数组中指定的元素
 * @return 返回处理后的数组
 * */
function removeElement(ary, obj){
    for (var i = 0; i < ary.length; ) {
        if (ary[i] == obj) {
            ary.splice(i, 1);
        } else {
            i++;
        }
    }
    return ary;
}


