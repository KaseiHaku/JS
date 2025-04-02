
/**
 * This is a description of the MyClass class.
 * @extends Object
 * @see JsDoc 官方文档 {@link https://jsdoc.app/}
 * @class
 * */
export class Cls extends Object {

  /******************************* 类静态属性/函数 *******************************/
  static #staticPvtAttr = '静态私有类属性，只能在类内部访问';
  static staticAttr = '静态类属性，可以直接通过 Cls.staticAttr 访问';
  /**
   * 静态私有类函数/方法，只能在类内部访问
   * */
  static #staticPvtFunc(){
    // 私有类方法，只能在 类 内部访问
  }
  /**
   * 静态类函数/方法，可以直接通过 Cls.staticFunc 访问
   * */
  static staticFunc(){ // 类方法
    this; // 类方法中的 this 指向的是类本身，不是类实例。这跟 java 中不一样
  }

  /**
   * 静态代码块，同 java
   * 每个类允许有多个静态块，每个静态块中只能访问之前声明的静态属性
   * 静态块内部可以使用类名或this，指代当前类
   * */
  static {

    /**
     * @type {Object}                   - 表明当前 obj 变量的类型是 Object
     * @property {number} code          - 表明当前 obj.code 的类型是 number
     * @property {string[]} result      - 表明当前 obj.result 的类型是 string[]
     * */
    let obj = /** @lends Object */ {}; // 用于表明当前 literal object 的类型
  }




  /******************************* 实例属性 *******************************/
  #insPvtAttr = '私有实例属性，只能在类内部访问';
  insAttr = '实例属性，可以直接通过 new Cls().insAttr 访问';
  /**
   * @type Symbol 表明当前字段是 {@link Symbol} 类型
   * @typedef Person 定义一个新的类型
   * @property {number} amount 指定类型 Person.amount 的属性
   * */
  objectId = Symbol('instance unique id');

  /******************************* Getter/Setter *******************************/
  get insAttr(){ /* 相当于 java 中的 getter 方法 */ }
  set insAttr(value){ /* 相当于 java 中的 setter 方法 */ }

  /******************************* Constructor *******************************/
  /**
   * @constructs
   * @param {(number|string)} x
   * */
  constructor(x, y){  // 该方法等价于 ES5 中的 Person.prototype.constructor
    super(); // 子类构造函数必须先调用父类构造函数
    // ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
    // 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的
    console.log(new.target);
    // if (new.target === Cls) {
    //   throw new Error('本类不能实例化'); // 利用 new.target 实现 java abstract class
    // }


    return this; // 构造函数默认返回实例对象，当然也可以手动改变，如 return 'string';
  }



  /******************************* 实例函数 *******************************/
  /**
   * 私有实例方法，只能在类内部访问
   * */
  #pvtInsFunc(){

  }
  /**
   * 实例函数/方法
   * @param {Object.<string, number>} obj    表示是 Object 类型，且 key=string, value=number
   * @param {Array.<MyClass>} ary    表示是 Array 类型，且 元素类型为 MyClass
   * @param {Map.<string, number>} map    表示是 Map 类型，且 key=string, value=number
   * @param {{a: number, b: string, c}} obj    表示是 Object 类型，且格式如上所述
   * # 以下 4 行，等价于上面一行
   * @param {Object} obj2     表示 obj2 是 Object 类型
   * @param {number} obj2.a   表示 obj2.a 是 number 类型
   * @param {string} obj2.b   表示 obj2.b 是 string 类型
   * @param {*} obj2.c        表示 obj2.c 是 any 类型
   *
   *
   * @param {?number} orNull                  表示可以为 null
   * @param {!number} notNull                 表示不可以为 null
   * @param {...number} varLenParam           表示变长参数
   * @param {number} [opt1=1]                 表示 opt1 参数可选，且默认值为 1
   * @param {number} [opt2]                   表示 opt2 参数可选
   * @param {number=} opt2                    同上
   *
   * @param {function(string, number): boolean} callback   回调函数
   *   @param {string} input - 输入数据
   *   @param {number} count - 处理次数
   *   @returns {boolean} 处理是否成功
   *
   * @param {(input: string, count: number) => Array<string>} cb2 - 处理数据的回调函数
   *   @param {string} input - 输入数据
   *   @param {number} count - 处理次数
   *   @returns {Array<string>} 处理结果
   *
   * */
  insFunc(map, obj, obj2, opt1=1, opt2, callback, cb2){

  }



}


class A extends Object {


  /**
   * @type Cls
   * */
  cls = new Cls();

  static bb = {
    g1: 2
  }

}


class B extends A {

}

let assign = Object.assign(new A(), {cls:{objectId: Symbol('bb'), insAttr: 'bb'}});
let cls = assign.cls;
console.log(cls.objectId);
console.log(B.bb);




/**
 * @class BaseDto
 * */
export class BaseDto extends Object {
  /** @type {string} */
  id;
  /** @type {string} */
  creatorId;
  /** @type {number} */
  createTime;
  /** @type {string} */
  updaterId;
  /** @type {number} */
  updateTime;
  /** @type {number} */
  version;
  /** @type {string} */
  deleted;
  /** @type {string} */
  privCreatorHgid;
}

/**
 * @class BaseQry
 * */
export class BaseQry extends Object {
  /** @type {string} */
  id;
  /** @type {string} */
  creatorId;
  /** @type {number} */
  createTimeStart;
  /** @type {number} */
  createTimeEnd;
  /** @type {string} */
  updaterId;
  /** @type {number} */
  updateTimeStart;
  /** @type {number} */
  updateTimeEnd;
  version;
  /** @type {string} */
  deleted;
  /**
   * @type {Array.<string>}
   * */
  privCreatorHgids;
}


