let hobies :string[] = ["gym ", "fottball"]; 
const [first , second ]=  hobies
let name:string = "atigh"
{
    let name:string = "atigh abdel vetahu"
} 
class Student{
    name:string;
    ID:string
    constructor(name:string,ID:string ){
        this.name = name ;
        this.ID = ID;
    }
    getName(this:Student):string{
        return this.name;
    }
    setName(name:string):void{
        this.name= name

    }
}

let s1 = new Student("ahemd","2");
let getNameValue = s1.getName()

console.log("getName value" , getNameValue)
console.log(s1.ID, s1.name)
let student={
    name:s1.getName(),
    getName: s1.getName
}
let r = student.getName()!
console.log(r)