'use strict';

class Person{
    constructor(name,age){
        this.name = name;
        this.age = age;
        Object.keys(this).forEach((key)=> this._proxy(key));   
    }

    /**
     * 为传入的元素键添加 get 和 set 属性
     * @param {String} key 
     */
    _proxy (key) {
        Object.defineProperty(this,key,{
            enumerable: true,
            configurable: true,
            get: ()=>{
                return this[key];
            },
            set: (newVal)=>{
                return this[key] = newVal;
            }
        });
    }

    sayHello () {
        console.log(this);
        // console.log(this.name);
        // alert(`Hello ! My name'is ${this.name},I'm ${this.}`)
    }
}

let person = new Person('H_VK',18);
console.log(person);