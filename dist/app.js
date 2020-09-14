"use strict";
var Student = /** @class */ (function () {
    function Student(name, ID) {
        this.name = name;
        this.ID = ID;
    }
    Student.prototype.getID = function () {
        return this.ID;
    };
    Student.prototype.setID = function (ID) {
        this.ID = ID;
    };
    Student.prototype.getName = function () {
        return this.name;
    };
    Student.prototype.setName = function (name) {
        this.name = name;
    };
    return Student;
}());
var s1 = new Student("ahemd", "2");
var getNameValue = s1.getName();
console.log("getName value", getNameValue);
console.log("object instance ", s1.getID(), s1.getName());
var student = {
    name: s1.getName(),
    getName: s1.getName
};
var r = student.getName();
console.log(r);
