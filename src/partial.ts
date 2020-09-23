interface CourseGoal {
    title:string;
    description:string;
}
function courseGoal(title:string = "g" , description:string):CourseGoal{
    let goal :Partial<CourseGoal> = {}
    goal.title = title ; 
    goal.description = description;
    return <CourseGoal>goal;
}
let value: Readonly<string[]> = ['honesty'];
// can not push item to this array 
