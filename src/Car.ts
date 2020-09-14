abstract class Car {
    constructor(public model:string  ,public color:String,public speed:number) {
        this.model= model;
        this.color= color;
        this.speed = speed;
    }
    abstract speedPerHour():void;
}

class Toyota extends Car {
    speedPerHour():void{
       console.log("hello")
    }
}
interface Vehicule{
    name:string;
    model:string;
    speed:number;
    getSpeed():number
}
class Mercedece implements Vehicule {
    constructor( public name:string,public model:string, public speed:number){
        this.name = name;
        this.model= model;
        this.speed = speed;
    }
    getSpeed():number{
        return this.speed;
    }

}
let v = new Mercedece("190", "1984" , 180)