interface Validatable {
  required: boolean;
  value: number | string;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
}
interface Draggeble {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
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
    if (elementId) {
      this.element.id = elementId;
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
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
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
type Listner<T> = (itmes: T[]) => void;
class State<T> {
  protected listners: Listner<T>[] = [];
  addListner(listnerFunction: Listner<T>): void {
    this.listners.push(listnerFunction);
  }
}
class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggeble {
  constructor(hostId: string, public project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @autoBindThis
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
    console.log(this);
  }
  @autoBindThis
  dragEndHandler(event: DragEvent): void {}
  get persons() {
    if (this.project.people == 1) {
      return "1 Person  assigned";
    }
    return `${this.project.people} assigned`;
  }
  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = "People: " + this.persons;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
class ProjectState extends State<Project> {
  private projects: Project[] = [];

  private static instance: ProjectState;
  private constructor() {
    super();
  }
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
    this.updateListner();
  }
  removeProject(projectId: string, updatedStaus: ProjectStatus) {
    let project = this.projects.find((prj) => prj.id === projectId);
    if (project) {
      project.status = updatedStaus;
      this.updateListner();
    }
  }
  updateListner() {
    for (let listnerFn of this.listners) {
      listnerFn(this.projects.slice());
    }
  }
}
const projectState = ProjectState.getInstance();

class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProject: Project[] = [];
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProject = [];
    this.configure();
    this.renderContent();
  }
  @autoBindThis
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0]) {
      event.preventDefault();
      let ulElement = this.element.querySelector("ul");
      ulElement?.classList.add("droppable");
    }
  }
  @autoBindThis
  dropHandler(event: DragEvent): void {
    let projectId = event.dataTransfer!.getData("text/plain");
    projectState.removeProject(
      projectId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }
  @autoBindThis
  dragLeaveHandler(event: DragEvent): void {
    this.element.querySelector("ul")?.classList.remove("droppable");
  }
  renderProject() {
    let element = document.getElementById(
      `${this.type}-project-list`
    )! as HTMLUListElement;
    element.innerHTML = "";
    for (let project of this.assignedProject) {
      let projectItem = new ProjectItem(
        this.element.querySelector("ul")!.id,
        project
      );
      //projectItem.style.listStyle = "none";
    }
  }
  renderContent() {
    let id = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = id;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
  configure(): void {
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    projectState.addListner((projects: Project[]) => {
      let releventProject = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
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
    super("project-input", "app", true, "user-input");
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
    document.getElementById("title")!.value = "";
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
