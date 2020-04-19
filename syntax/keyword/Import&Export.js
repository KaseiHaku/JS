/** TODO Export
 * default export 每个 module 最多只有一个
 * */
export default expression;
export default function () {  } // also class, function*
export default function name1() {  } // also class, function*
let name1 = 2;
export { name1 as default };

export { variable1 as name1, variable2 as name2, …, nameN }; // 普通导出

/** TODO Import */
import myDefault from "module-name";            // 导入 module-name 的 default export 到 myDefault 变量上
import * as myModule from 'module-name';        // 导入 module-name 的 所有 export (除了 default export) 到 变量 myNodule 上
import { export1, export2 as alias2 } from "module-name";      // 导入 module-name 的 export1, export2 两个导出到同名的变量或别名上