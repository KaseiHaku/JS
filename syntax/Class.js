
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

/** ES6 */
let methodName = 'getArea';
class Person6 extends Animal {
    static staticAttribute = `类属性`;
    dynamicAttribute = `类的实例属性`;
    static staticFunction(){ // 类方法
        this; // 类方法中的 this 指向的是类本身，不是类实例。这跟 java 中不一样
    }
    dynamicFunction(){ // 实例方法

    }

    X: null;
    Y: null;

    constructor(x, y){  // 该方法等价于 ES5 中的 Person.prototype.constructor
        super(); // 子类构造函数必须先调用父类构造函数
        this.x = x;
        this.y = y;
        this.attr = {
            descriptor: new Descriptor(), // 每个属性都有各一个描述属性自身的 Descriptor 实例
        };
        return this; // 构造函数默认返回实例对象，当然也可以手动改变，如 return 'string';
    }

    toString(){ // 该方法等价于 ES5 中的 Person.prototype.toString
        return '{ "x": ' + this.x + ', "y": ' + this.y + ' }';
    }


    get attr(){

    }
    set attr(value){

    }
    [methodName](){ // 动态方法名

    }

    static classMethod() {
        return 'hello';
    }
}

var Bob6 = new Person6(2, 3);

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


