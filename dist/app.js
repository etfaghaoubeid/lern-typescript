"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autoBindThis(target, methodName, descriptor) {
    const originalMehod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            return originalMehod.bind(this);
        },
    };
    return adjDescriptor;
    console.log(descriptor);
}
function userInputValidation(input) {
    if ((input.required === true &&
        typeof input.value === "string" &&
        input.value.trim().length > input.minLength &&
        input.value.trim().length < input.maxLength) ||
        (input.required == true &&
            typeof input.value === "number" &&
            input.value > input.min &&
            input.value < input.max)) {
        return true;
    }
    else {
        return false;
    }
}
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Component {
    constructor(templateElementId, hostElementId, insertAtBeginning, elementId) {
        this.templateElement = document.getElementById(templateElementId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (elementId) {
            this.element.id = elementId;
        }
        this.attach(insertAtBeginning);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "beforeend" : "beforeend", this.element);
        return;
    }
}
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    getPeopel() {
        return this.people;
    }
    setPoeple(people) {
        this.people = people;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
}
class State {
    constructor() {
        this.listners = [];
    }
    addListner(listnerFunction) {
        this.listners.push(listnerFunction);
    }
}
class ProjectItem extends Component {
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
        console.log(this);
    }
    dragEndHandler(event) { }
    get persons() {
        if (this.project.people == 1) {
            return "1 Person  assigned";
        }
        return `${this.project.people} assigned`;
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = "People: " + this.persons;
        this.element.querySelector("p").textContent = this.project.description;
    }
}
__decorate([
    autoBindThis
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    autoBindThis
], ProjectItem.prototype, "dragEndHandler", null);
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        let newInstance = new ProjectState();
        return newInstance;
    }
    addPorject(title, description, people) {
        let newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListner();
    }
    removeProject(projectId, updatedStaus) {
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
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProject = [];
        this.assignedProject = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0]) {
            event.preventDefault();
            let ulElement = this.element.querySelector("ul");
            ulElement === null || ulElement === void 0 ? void 0 : ulElement.classList.add("droppable");
        }
    }
    dropHandler(event) {
        let projectId = event.dataTransfer.getData("text/plain");
        projectState.removeProject(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        var _a;
        (_a = this.element.querySelector("ul")) === null || _a === void 0 ? void 0 : _a.classList.remove("droppable");
    }
    renderProject() {
        let element = document.getElementById(`${this.type}-project-list`);
        element.innerHTML = "";
        for (let project of this.assignedProject) {
            let projectItem = new ProjectItem(this.element.querySelector("ul").id, project);
            //projectItem.style.listStyle = "none";
        }
    }
    renderContent() {
        let id = `${this.type}-project-list`;
        this.element.querySelector("ul").id = id;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    configure() {
        this.element.addEventListener("drop", this.dropHandler);
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        projectState.addListner((projects) => {
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
__decorate([
    autoBindThis
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autoBindThis
], ProjectList.prototype, "dropHandler", null);
__decorate([
    autoBindThis
], ProjectList.prototype, "dragLeaveHandler", null);
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "user-input");
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    submitHandler(event) {
        event.preventDefault();
        const userInputs = this.gatherUserInputs();
        if (Array.isArray(userInputs)) {
            const [title, description, people] = userInputs;
            projectState.addPorject(title, description, people);
            this.clearInputs();
            return [title, description, people];
        }
    }
    clearInputs() {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("people").value = "";
        return;
    }
    gatherUserInputs() {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const people = parseInt(document.getElementById("people").value);
        if (userInputValidation({
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
            })) {
            console.log([title, description, people]);
            return [title, description, people];
        }
        this.clearInputs();
        alert("invalid inputss");
    }
    renderContent() { }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
}
__decorate([
    autoBindThis
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
let pl1 = new ProjectList("active");
let pl = new ProjectList("finished");
