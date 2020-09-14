class Person {
    name :string;
    age : number;
    sex : string;
   constructor(name:string, age:number, sex:string){
       this.name= name;
       this.age= age;
       this.sex= sex
   }
   setName(name:string):void{
       this.name = name
   }
   getName():string{
       return this.name
   }
   setAge(age:number):void{
       this.age = age;
   }
   getAge():number{
       return this.age;
   }
   setSex(sex:string):void{
       this.sex;
   }
   getSex():string{
       return this.sex;
   }
   info():void{
       console.log("info methode")
   }
   
}
class Employee extends Person{
    static static_property:string = "static";
    constructor( name:string , age:number,  sex:string ,private salary:number){
        super(name, age , sex)
        this.salary = salary;
    }

    

}

let am = new Employee("ahmed" , 24, "M" , 340000)
console.log("Employee class", am);
am.info()
console.log("static",Employee.static_property)