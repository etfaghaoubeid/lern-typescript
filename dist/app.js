"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function LogDecorator(constructor) {
    console.log("decorator ", constructor);
}
function withTemplateDecorator(content, hookId) {
    return function (constructor) {
        let el = document.getElementById(hookId);
        if (el) {
            let p = new Person("Atigh");
            el.innerHTML = content;
            el.querySelector("h1").textContent = p.name;
        }
    };
}
;
let Person = class Person {
    constructor(name) {
        this.name = name;
    }
};
Person = __decorate([
    withTemplateDecorator("<h1>Factory decorator<h1>", "app")
], Person);
;
