"use strict";
class DataStorage {
    constructor() {
        this.data = [];
    }
    getData() {
        return this.data;
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        return this.data.splice(this.data.indexOf(item), 1);
    }
}
let d = new DataStorage();
d.addItem("mouvid");
