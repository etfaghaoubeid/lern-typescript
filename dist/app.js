"use strict";
// init generic
let promise = new Promise((resolve, reject) => {
    setTimeout(resolve('promise resolved'), 1000);
});
promise.then(data => {
    console.log(data);
});
function mergeObj(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
let r = mergeObj({ namee: "atigh", position: "developer" }, { name: "Mouvid" });
console.log(r);
function join(param1) {
}
