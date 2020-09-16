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