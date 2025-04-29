/******************************* JS Object 创建演变过程 *******************************/

/******************************* 字面量(literal) 创建 Object *******************************/
const obj1 = {
    key1: 'str',
    key2: ['str1', 'str2'],
    key3: function(){},
    key32(){},
    key4: () => {},
    key5: {},
};

const obj2 = {
    key1: 'str',
    key2: ['str1', 'str2'],
    key3: function(){},
    key32(){},
    key4: () => {},
    key5: {},
};

/******************************* invoke create function 创建 Object ********************************
 * literal 创建 object 的缺点:
 *     - 每定义一个 object，object 中所有 code 都得完整的重写一边
 *     - 如果要新加一个 height 属性，需要在所有 object 的 code 中新增; 根本记不住哪些 object 是一个类型的，需要添加属性
 * */
function createPerson(name){
    // 创建一个空 obj
    const obj = {};
    // 初始化该空 obj 
    obj.name = name;
    obj.introduceSelf = function () {
        console.log(`Hi! I'm ${this.name}.`);
    };
    // return 该 obj
    return obj;
}

const obj1 = createPerson('1');
const obj2 = createPerson('2');



/******************************* 构造函数(constructor) 创建 Object ********************************
 * invoke create function 创建 Object 的缺点:
 *     - 有点绕; 需要以下步骤: 创建一个空 obj -> 初始化该空 obj -> return 该 obj
 *
 * 什么是 constructor?
 *     用 new 来调用一个 function，那么该 function 就是 constructor
 * */
function Person(name){
    // 用 new 调用该函数 会自动 创建一个 object 
    // 该 object 会绑定到 this 关键字上
    // 运行 contructor 中的代码
    this.name = name;
    this.introduceSelf = function () {
        console.log(`Hi! I'm ${this.name}.`);
    };
    // 自动 return 该 object
}

const obj1 = new Person('1');
const obj2 = new Person('2');


/******************************* 构造函数(constructor) 创建 Object with Prototype ********************************
 * ES5 = ES2015
 * 
 * */
function Person(x, y){
    constructor = Function; // JS primitive Object
    prototype = {
        X: null,
        Y: null,
        constructor: Person,
        toString: function(){
            return '{ "x": ' + this.x + ', "y": ' + this.y + ' }';
        }
    };
    this.x = x; // this 表示当前函数 Person new 出来的实例，即下面的 Bob
    this.y = y;
}
var Bob = new Person(2, 3);
Bob.__proto__ = Person.prototype;
Bob.constructor == Person;

/******************************* class 创建 Object with Prototype ********************************
 * ES6 >= ES2016
 * @trap  class 内部函数，最好都使用箭头函数，这样不会出现 函数提取到外部使用时，this 报 undefined 错误
 * */
let methodName = 'getArea';
class Person6 extends Animal {
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

  }

  /******************************* 实例属性 *******************************/
  #insPvtAttr = '私有实例属性，只能在类内部访问';
  insAttr = '实例属性，可以直接通过 new Cls().insAttr 访问';

  /******************************* Getter/Setter *******************************/
  get insAttr(){ /* 相当于 java 中的 getter 方法 */ }
  set insAttr(value){ /* 相当于 java 中的 setter 方法 */ }

  /******************************* Constructor *******************************/
  constructor(x, y){  // 该方法等价于 ES5 中的 Person.prototype.constructor
    super(); // 子类构造函数必须先调用父类构造函数
    this.attr = {
      descriptor: new Descriptor(), // 每个属性都有各一个描述属性自身的 Descriptor 实例
    };
    // ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
    // 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的
    console.log(new.target);
    if (new.target === Cls) {
      throw new Error('本类不能实例化'); // 利用 new.target 实现 java abstract class
    }


    return this; // 构造函数默认返回实例对象，当然也可以手动改变，如 return 'string';
  }



  /******************************* 实例函数 *******************************/
  /**
   * 私有实例方法，只能在类内部访问
   * @trap js Function 中的 this 默认绑定到 windows 对象上，而不是当前实例
   *       推荐使用 () => {} 方式定义实例函数
   *       如果非要用 function 方式定义函数，那么应该使用 func.apply(), func.call(), func.bind() 方式调用，
   *       其中 func.bind(thisArg) return 一个新的 function 并绑定 thisArg 到 this 关键字上，调用时，使用 returnFunc() 进行调用，而不是 func()
   * */
  #pvtInsFunc(){

  }
  /**
   * 实例函数/方法
   * */
  insFunc(){

  }

  toString(){ // 该方法等价于 ES5 中的 Person.prototype.toString
      return '{ "x": ' + this.x + ', "y": ' + this.y + ' }';
  }
  
  [methodName](){ // 动态方法名

  }
}

var Bob6 = new Person6(2, 3);
console.log(Person6.name); // name 属性总是返回紧跟在 class 关键字后面的类名

/* 只使用一次的 class，相当于 java 中的匿名内部类 */
let person = new class {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}('张三');

person.sayName(); // "张三"


/** 
 * 能不使用 extends 就别使用，最好使用组合的模式实现
 */
class A {
    static get attr1(){
        return 'attr1';
    }
    attr2 = 'attr2';
}

class B {        // 这里使用 组合 的方式，实现继承
    static #superStaticHolder = A;        // 持有父类的私有静态字段
    static get attr1(){
        return #superStaticHolder.attr1;
    }

    #superInsHolder = new A();        // 持有父类实例的私有字段
    get attr2(){
        return #superInsHolder.attr2;
    }
}

