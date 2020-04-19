/** TODO Array */
var ary = [1, false, 'ggh'];
var ary3 = new Array(1, 2, 3, 4);

/** TODO Frequently Usage */
var ary2 = new Array();
ary2.length; // 返回当前数组的长度
ary2.concat(ary1, ary2, ary3);// 连接多个数组
ary2.join(","); // 把数据转化成字符串，各元素间用 ',' 分隔
ary2.push("ad", "cd", "ef"); // 在数组末尾添加
ary2.pop(); // 弹出数组最后一个对象
ary2.reverse(); // 反转数组顺序
ary2.shift(); // 删除并返回数组第一个元素
ary2.unshift("a","b","c");// 向数组头部添加一个或多个元素
ary2.slice(-1,-6); // 裁剪数组，返回一个裁剪后的数组
ary2.sort(function(a,b){
    // 如果没有传入 排序函数 那么 按字母排序
    if(a>b){return -1};// 若 a 小于 b，在排序后的数组中 a 应该出现在 b 之前，则返回一个小于 0 的值。
    if(a=b){return 0};// 若 a 等于 b，则返回 0。
    if(a<b){return 1};// 若 a 大于 b，则返回一个大于 0 的值。
});
ary2.splice(position, length, "a","b"); // 从指定位置开始，删除指定长度的元素，并添加元素 a b
ary2.toString();// 转换成 字符串