// function Date(){}
new Date("2012/12/25 20:11:11");  // 只能是这种格式的时间才能转换成 Date 对象


// 获取时区
Intl.DateTimeFormat().resolvedOptions().timeZone;
new Intl.DateTimeFormat().resolvedOptions().timeZone;
