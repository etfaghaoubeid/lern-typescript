"use strict";
class Person {
    constructor(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setAge(age) {
        this.age = age;
    }
    getAge() {
        return this.age;
    }
    setSex(sex) {
        this.sex;
    }
    getSex() {
        return this.sex;
    }
}
class Employee extends Person {
    constructor(name, age, sex, salary) {
        super(name, age, sex);
        this.salary = salary;
        this.salary = salary;
    }
}
let am = new Employee("ahmed", 24, "M", 340000);
console.log("Employee class", am);
