"use strict";
// init generic
let promise = new Promise((resolve, reject) => {
    setTimeout(resolve('promise resolved'), 1000);
});
promise.then(data => {
    console.log(data);
});
