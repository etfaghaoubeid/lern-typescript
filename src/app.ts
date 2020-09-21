// init generic
let promise:Promise<string> = new Promise((resolve , reject)=>{
    setTimeout(resolve('promise resolved'), 1000)
})
promise.then(data=>{
    console.log(data)
})
function mergeObj<S>(obj1:S, obj2:S):S{
    return Object.assign(obj1, obj2)
}
let r = mergeObj({namee :"atigh",position:"developer"} , {name:"Mouvid"});
console.log(r)
function join<S extends object>(param1:S){
    
}