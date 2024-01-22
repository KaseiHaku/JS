/** TODO 字面量 */
var literal_num = -123.4;

Number.isNaN('a'); // 判断 param 是否是 NaN

/** 其他对象转成 number primitive 的方法 */
window.parseInt('123');
window.parseFloat('123.4');
Number.parseInt('123');
Number.parseFloat('123.4');
new Number('123');  // @trap 这个转换出来的是 Number 类型，不是 number primitive，即: new Number('123') === 123  是 false，而不是 true
Number('123'); // 这个的结果才是 number primitive，即：Number('123') === 123  是 true

