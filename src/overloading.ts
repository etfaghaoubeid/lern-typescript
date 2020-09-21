
function addd(s1:number, s2:number):number;
function addd(n1:number|string, n2:number|string):string|number{
    if(typeof n1=='string'|| typeof n2=='string'){
        return n1.toString()+  n2.toString();
    }
    return n1+n2;
}