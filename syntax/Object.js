/** TODO Class Definition */
function Kasei() {
    this.prototype;             /* 默认存在，该字段保存的是 Kasei 这个类，父类的对象
                                 *（即 this.prototype = new Object();），该对象是所有用 Kasei 类创建的 kasei 对象共用的对象，相当于 java 中的静态字段
                                 */

    this.constructor;           /* 默认存在，该字段保存的是 创建该对象的类的引用
                                 *（即：this.constructor = function(){}  function Kasei(){}  constructor 完全等价于 Kasei）
                                 * 调用 this.constructor() 相当于调用 Kasei()
                                 * */
    this.name = null;           /* 所有属性定义的时候都应该初始化，如果不知道初始化为什么就 = null */
    this.age = null;

    this.getName = function () {
        return this.name;
    };
    this.setName = function (name) {
        this.name = name;
    };

    this.getAge = function () {
        return this.age;
    };
    this.setAge = function (age) {
        this.age = age;
    };

    this.hello = function () {
        console.log("hello");
    }
}


/** TODO Instance */
// 方式1：用类创建对象
var Obj = new Object();
Obj.name = '"Haku"';
Obj.age = 22;
Obj.setName = function(name){
    this.name = name;
};

// 方式2：直接用字面量创建一个对象
var person = {
    name:"John",
    lastName:"Doe",
    age:50,
    cars:[1,4.9,"Nissan"],

    setName:function(name){

        this.name = name;
        return 0;
    }
};


// 方式3： js 中的 pseudo-array 伪数组
var standardPseudoArray = {
    0: "a",
    1: 2,
    2: "d",
    3: false,
    length: 3
};
var trueArray = Array.prototype.slice.call(standardPseudoArray); // 该方法能把 伪数组 转换成 真正的数组


// 方式4: 工厂方式
function createObj(name, age){
    var Obj = new Object();
    Obj.name = '"Haku"';
    Obj.age = 22;
    Obj.setName = setName;

    return Obj;
}

function setName(name){
    this.name = name;
}

var obj1 = createObj('"Haku"', 22);
var obj2 = createObj("Miku", 16);


// 方式5: 构造函数方式
function Obj(name, age){
    this.name = name;
    this.age = age;
    this.setName = function(name){
        this.name = name;
    }
}

var obj1 = new Obj('"Haku"', 22);
var obj2 = new Obj("Miku", 16);


// 方式6：原型方式
function Car() {
}

Car.prototype.color = "blue";
Car.prototype.doors = 4;
Car.prototype.mpg = 25;
Car.prototype.showColor = function() {
    alert(this.color);
};

var oCar1 = new Car();
var oCar2 = new Car();


// 方式7:混合的构造函数/原型方式
function Car(sColor,iDoors,iMpg) {
    this.color = sColor;
    this.doors = iDoors;
    this.mpg = iMpg;
    this.drivers = new Array("Mike","John");
}

Car.prototype.showColor = function() {
    alert(this.color);
};

var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);

oCar1.drivers.push("Bill");

alert(oCar1.drivers);    //输出 "Mike,John,Bill"
alert(oCar2.drivers);    //输出 "Mike,John"


// 方式8：动态原型方法
function Car(sColor,iDoors,iMpg) {
    this.color = sColor;
    this.doors = iDoors;
    this.mpg = iMpg;
    this.drivers = new Array("Mike","John");

    if (typeof Car._initialized == "undefined") {
        Car.prototype.showColor = function() {
            alert(this.color);
        };

        // 采用字面量的形式，会出错，原因见下面
        Car.prototype = {
            showColor: function(){
                alert(this.color);
            }
        };

    }
    Car._initialized = true;
}
// new 操作符执行的过程，下面两个运算是等价的，可以用来解释动态原型中不能使用字面量的原因
var car1 = new Car();
var car1 = function newOperator(){
    var obj = {};
    obj.__proto__ = Car.prototype;
    Car.call(obj);
    return obj;
};



/** TODO Instance Usage */
/* js 中为一个对象添加属性和方法，但不能为类添加属性和方法 */
kasei.wife = "Haku"; // 为一个对象添加属性，注意不是类
kasei.getWife = function(){ // 为一个对象添加方法，注意：对其他对象，但是是同一个类创建的对象，该方法无效
    return kasei.wife;
};

/* js 中访问对象的属性和方法 */
xiaoming.name;
xiaoming["age"]; // 访问对象的属性
xiaoming.sayHi();  // 访问对象的方法

for(var name in obj){  // js 获取类的所有属性和方法
    names+=name+": "+obj[name]+", ";
}
/* js 中删除对象的属性和方法 */
delete xiaoming.name; // 删除实例 xiaoming 的 name 属性


/** TODO js 自动装箱机制
 * 把一个基本类型尝试用对象的方式使用它的时候，比如访问length属性，或者增加一些属性的操作时，
 * javascript会把这些基本类型转化为对应的包装类型对象。完成这样一个访问比如a.length返回以后或者a.t设置了以后，
 * 这个临时对象会被销毁掉。所以a.t赋值3了以后，再去输出a.t值是undefined。
 * */
function autoboxing(){
    var a = "string";  // 基本类型
    console.log(a.length); // 创建临时对象
    a.t = 3; // 创建临时对象
    console.log(a.t); // undefined	因为临时对象已经销毁
}