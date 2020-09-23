function LogDecorator(constructor:Function){
    console.log("decorator ", constructor)
}
function withTemplateDecorator(content:string , hookId:string){
    return function(constructor:Function){
        let el = document.getElementById(hookId);
        if(el){
            let p:Person = new Person("Atigh")
            el.innerHTML = content;
            el.querySelector("h1")!.textContent = p.name;
        }
    } 
};

@withTemplateDecorator("<h1>Factory decorator<h1>", "app")
class Person {
    name:string;
    constructor(  name:string){
        this.name = name;
    }
};