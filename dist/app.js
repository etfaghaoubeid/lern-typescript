"use strict";
var hobies = ["gym ", "fottball"];
var name = "atigh";
var first = hobies[0], second = hobies[1];
{
    var name_1 = "atigh abdel vetahu";
}
var Student = /** @class */ (function () {
    function Student(name, ID) {
        this.name = name;
        this.ID = ID;
    }
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
console.log(s1.ID, s1.name);
var student = {
    getNmae: s1.getName
};
var r = student.getNmae();
console.log(r);
