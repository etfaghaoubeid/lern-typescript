function makeState<S>(){
    let state:S;
    function getState():S{
        return state;
    }
    function setState(statee:S):void{
         state = statee;
    }
    return {
        getState, 
        setState
    }
}
let promise:Promise<string> = new Promise((resolve , reject)=>{
    setTimeout:void(resolve('promise resolved'), 1000)
})
promise.then(data=>console.log(data))