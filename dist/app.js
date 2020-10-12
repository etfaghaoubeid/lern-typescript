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
        this.insertAtBeginning = insertAtBeginning;
        if (elementId) {
            this.elementId = elementId;
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
class ProjectState {
    constructor() {
        this.projects = [];
        this.listners = [];
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
        for (let listnerFn of this.listners) {
            listnerFn(this.projects.slice());
        }
    }
    addListner(listnerFunction) {
        this.listners.push(listnerFunction);
    }
}
const projectState = ProjectState.getInstance();
class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProject = [];
        this.configure();
        this.renderContent();
    }
    renderProject() {
        let element = document.getElementById(`${this.type}-project-list`);
        console.log(element);
        element.innerHTML = "";
        for (let project of this.assignedProject) {
            let projectitem = document.createElement("li");
            projectitem.style.listStyle = "none";
            projectitem.textContent = project.title;
            element.appendChild(projectitem);
        }
    }
    renderContent() {
        let id = `${this.type}-project-list`;
        this.element.querySelector("ul").id = id;
        this.element.querySelector("h2").textContent = `${this.type} Projects`.toUpperCase();
    }
    configure() {
        projectState.addListner((projects) => {
            let releventProject = projects.filter((prj) => {
                if (this.type === "active") {
                    return prj.getStatus() === ProjectStatus.Active;
                }
                else {
                    return prj.getStatus() === ProjectStatus.Finished;
                }
            });
            this.assignedProject = releventProject;
            this.renderProject();
        });
    }
}
class ProjectInput extends Component {
    constructor() {
        super("project-input", "app", true, "project-input");
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
