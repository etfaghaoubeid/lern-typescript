"use strict";
class Car {
    constructor(model, color, speed) {
        this.model = model;
        this.color = color;
        this.speed = speed;
        this.model = model;
        this.color = color;
        this.speed = speed;
    }
}
class Toyota extends Car {
    speedPerHour() {
        console.log("hello");
    }
}
class Mercedece {
    constructor(name, model, speed) {
        this.name = name;
        this.model = model;
        this.speed = speed;
        this.name = name;
        this.model = model;
        this.speed = speed;
    }
    getSpeed() {
        return this.speed;
    }
}
let v = new Mercedece("190", "1984", 180);
