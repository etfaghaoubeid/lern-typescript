"use strict";
class Student {
    constructor(name, ID, phone) {
        this.name = name;
        this.ID = ID;
        this.phone = phone;
    }
    getID() {
        return this.ID;
    }
    setID(ID) {
        this.ID = ID;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
}
let s1 = new Student("ahemd", "2", "27525511");
let getNameValue = s1.getName();
console.log("getName value", getNameValue);
console.log("object instance ", s1.getID(), s1.getName());
let student = {
    name: s1.getName(),
    getName: s1.getName
};
let r = student.getName();
console.log(r);
s1.phone = "33635471";
