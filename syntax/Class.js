
/** todo ES6 class */
/** ES5 */
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

/** ES6 
 * class 内部函数，最好都使用箭头函数，这样不会出现 函数提取到外部使用时，this 报 undefined 错误
 */
let methodName = 'getArea';
class Person6 extends Animal {
    static staticAttribute = `类属性`;
    static #pvtAttr = '私有类属性，只能在类内部访问';
    static staticFunction(){ // 类方法
        this; // 类方法中的 this 指向的是类本身，不是类实例。这跟 java 中不一样
    }
    static #pvtFunc(){
        // 私有类方法，只能在 类 内部访问
    }
    static {
        // 静态代码块，同 java
        每个类允许有多个静态块，每个静态块中只能访问之前声明的静态属性
        静态块内部可以使用类名或this，指代当前类
    }
   
    
    dynamicAttribute = `类的实例属性`;
    #pvtDynamicAttribute = '私有实例属性，只能在类内部访问';
    X: null;
    Y: null;
    get attr(){ /* 相当于 java 中的 getter 方法 */ }
    set attr(value){ /* 相当于 java 中的 setter 方法 */ }

    constructor(x, y){  // 该方法等价于 ES5 中的 Person.prototype.constructor
        super(); // 子类构造函数必须先调用父类构造函数
        this.x = x;
        this.y = y;
        this.attr = {
            descriptor: new Descriptor(), // 每个属性都有各一个描述属性自身的 Descriptor 实例
        };
        // ES6 为new命令引入了一个new.target属性，该属性一般用在构造函数之中，返回new命令作用于的那个构造函数。
        // 如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined，因此这个属性可以用来确定构造函数是怎么调用的
        console.log(new.target);
        if (new.target === Person6) {
          throw new Error('本类不能实例化'); // 利用 new.target 实现 java abstract class 
        }

        
        return this; // 构造函数默认返回实例对象，当然也可以手动改变，如 return 'string';
    }

    dynamicFunction(){ // 实例方法

    }
    
    #pvtDynamicFunction(){ // 私有实例方法，只能在类内部访问

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

