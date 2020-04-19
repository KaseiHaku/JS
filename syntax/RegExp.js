/** TODO Foundamental Concept  */
// 语法：/模式串/修饰符;
// 修饰符解释：
// g 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）
// i 表示对大小写不敏感
// m 表示多行匹配，即以每一行为一个匹配串
// s
// u
// y

/** TODO Create Method */
var regexp1 = /pattern/igmsuy; // 创建一个正则表达式对象，字面量方式创建
var regexp2 = new RegExp(pattern, modifiers);// new 方式创建一个 正则表达式对象


/** TODO Usage */
var str = "kjerwn ediuh awdifuqe qweefiuohqweoi dqwefqef";
regexp2.exec(str);// exec() 方法用于检索字符串中的正则表达式的匹配。该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。
regexp2.test(str);// test() 方法用于检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。
regexp2.toString(); // 返回 正则表达式 的模式串