/** 
 * 什么是 ArrayBuffer？ JS 中用于表示 内存中指定的字节数
 * */
let buffer = new ArrayBuffer(32); // 分配一个 32 byte 的内存给 buffer 变量

/**
 * 什么是 DataView? JS 中用于操作 ArrayBuffer 的对象
 * */
let dataView = new DataView(buffer, 8, 24); // 从 buffer 的第 8 位开始，长度 24
dataView.setInt16(0, 256, true /* littleEndian */);  // 设置 dataView 的 0 号位的值为 256，小端模式存储，@trap 这里 dataView 的 0 == buffer 的 8 

/**
 * 什么是 Int8Array, Uint8Array, BigInt64Array 等？这些类型 统称为 TypedArray 类型，这是结合了 ArrayBuffer 和 DataView 的 type。表示指定类型的内存 
 * */
let int16Ary = new Int16Array();
int16Ary.fill(4, 1, 3); // 用 4 填充 index [1, 3) 的字节



