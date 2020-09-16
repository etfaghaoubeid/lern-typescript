"use strict";
function makeState() {
    let state;
    function getState() {
        return state;
    }
    function setState(statee) {
        state = statee;
    }
    return {
        getState,
        setState
    };
}
