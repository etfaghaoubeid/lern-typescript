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
function PropertyDecorator(target:any , propertyName:string){
    console.log( target, propertyName)
}
function ParameterDecorator(target:any , name:string, position:any){
    console.log("parameter decorator");
    console.log("target",target)
    console.log("name",name); 
    console.log("position",position);
}

class Product {
    private name: string ;
    @PropertyDecorator
    private price:number;
    constructor(name:string, price:number){
        this.name = name;
        this.price = price
    }
    getPriceWithTax( @ParameterDecorator tax:number){
        return this.price +(this.price*tax)
    }
}