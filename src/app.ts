interface Validatable {
  required: boolean;
  value: number | string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}
function autoBindThis(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMehod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      return originalMehod.bind(this);
    },
  };
  return adjDescriptor;
  console.log(descriptor);
}
function userInputValidation(input: Validatable): boolean {
  if (
    (input.required === true &&
      typeof input.value === "string" &&
      input.value.trim().length > input.minLength! &&
      input.value.trim().length < input.maxLength!) ||
    (input.required == true &&
      typeof input.value === "number" &&
      input.value > input.min! &&
      input.value < input.max!)
  ) {
    return true;
  } else {
    return false;
  }
}
enum ProjectStatus {
  Active,
  Finished,
}
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  insertAtBeginning: boolean;
  elementId?: string;
  constructor(
    templateElementId: string,
    hostElementId: string,
    insertAtBeginning: boolean,
    elementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateElementId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    this.insertAtBeginning = insertAtBeginning;
    if (elementId) {
      this.elementId = elementId;
    }

    this.attach(insertAtBeginning);
  }
  private attach(insertAtBeginning: boolean): void {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "beforeend" : "beforeend",
      this.element
    );
    return;
  }
  abstract configure(): void;
  abstract renderContent(): void;
}
class Project {
  constructor(
    private id: string,
    private title: string,
    private description: string,
    private people: number,
    private status: ProjectStatus
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = status;
  }
  getId(): string {
    return this.id;
  }
  setId(id: string): void {
    this.id = id;
  }
  getTitle(): string {
    return this.title;
  }
  setTitle(title: string): void {
    this.title = title;
  }
  getDescription(): string {
    return this.description;
  }
  setDescription(description: string): void {
    this.description = description;
  }
  getPeopel(): number {
    return this.people;
  }
  setPoeple(people: number): void {
    this.people = people;
  }
  getStatus(): ProjectStatus {
    return this.status;
  }
  setStatus(status: ProjectStatus): void {
    this.status = status;
  }
}
type Listner = (itmes: Project[]) => void;
class ProjectState {
  private projects: Project[] = [];
  private listners: Listner[] = [];
  private static instance: ProjectState;
  private constructor() {}
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    let newInstance = new ProjectState();
    return newInstance;
  }
  addPorject(title: string, description: string, people: number) {
    let newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (let listnerFn of this.listners) {
      listnerFn(this.projects.slice());
    }
  }
  addListner(listnerFunction: Listner): void {
    this.listners.push(listnerFunction);
  }
}
const projectState = ProjectState.getInstance();

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProject: Project[] = [];
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.configure();
    this.renderContent();
  }
  renderProject() {
    let element = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    console.log(element);
    element.innerHTML = "";
    for (let project of this.assignedProject) {
      let projectitem = document.createElement("li");
      projectitem.style.listStyle = "none";
      projectitem.textContent = project.title!;
      element.appendChild(projectitem);
    }
  }
  renderContent() {
    let id = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = id;
    this.element.querySelector(
      "h2"
    )!.textContent = `${this.type} Projects`.toUpperCase();
  }
  configure(): void {
    projectState.addListner((projects: Project[]) => {
      let releventProject = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.getStatus() === ProjectStatus.Active;
        } else {
          return prj.getStatus() === ProjectStatus.Finished;
        }
      });

      this.assignedProject = releventProject;
      this.renderProject();
    });
  }
}
class ProjectInput extends Component<HTMLDivElement, HTMLTemplateElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "project-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }
  @autoBindThis
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInputs = this.gatherUserInputs();
    if (Array.isArray(userInputs)) {
      const [title, description, people] = userInputs;
      projectState.addPorject(title, description, people);
      this.clearInputs();
      return [title, description, people];
    }
  }
  private clearInputs(): void {
    document.getElementById("title")!.value! = "";
    document.getElementById("description")!.value = "";
    document.getElementById("people")!.value = "";
    return;
  }
  private gatherUserInputs(): [string, string, number] | void {
    const title = document.getElementById("title")!.value!;
    const description = document.getElementById("description")!.value;
    const people: number = parseInt(document.getElementById("people")!.value);
    if (
      userInputValidation({
        required: true,
        value: title,
        maxLength: 40,
        minLength: 1,
      }) &&
      userInputValidation({
        required: true,
        value: description,
        maxLength: 500,
        minLength: 10,
      }) &&
      userInputValidation({
        required: true,
        value: people,
        max: 10,
        min: 0,
      })
    ) {
      console.log([title, description, people]);
      return [title, description, people];
    }
    this.clearInputs();
    alert("invalid inputss");
  }
  renderContent(): void {}
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}

const prjInput = new ProjectInput();
let pl1 = new ProjectList("active");
let pl = new ProjectList("finished");
