"use strict";
var _a, _b;
class TodoList {
    constructor() {
        this.todos = [];
        this.nextId = 1;
    }
    addTask(task) {
        if (task.trim() !== "") {
            this.todos.push({ id: this.nextId++, task, completed: false });
        }
    }
    removeTask(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.updateUI();
    }
    toggleTaskCompletion(id) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.updateUI();
        }
    }
    editTask(id, newTask) {
        const todo = this.todos.find((todo) => todo.id === id);
        if (todo) {
            todo.task = newTask;
            this.updateUI();
        }
    }
    updateUI() {
        const taskList = document.getElementById("taskList");
        if (taskList) {
            taskList.innerHTML = "";
            this.todos.forEach((todo) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${todo.task} - ${todo.completed ? "Completed" : "Not Completed"}`;
                const toggleButton = document.createElement("button");
                toggleButton.textContent = todo.completed ? "Undo" : "Complete";
                toggleButton.onclick = () => this.toggleTaskCompletion(todo.id);
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = () => this.removeTask(todo.id);
                const editButton = document.createElement("button");
                editButton.textContent = "Edit";
                editButton.onclick = () => {
                    const newTask = prompt("Edit task:", todo.task);
                    if (newTask !== null) {
                        this.editTask(todo.id, newTask);
                    }
                };
                listItem.appendChild(toggleButton);
                listItem.appendChild(removeButton);
                listItem.appendChild(editButton);
                taskList.appendChild(listItem);
            });
        }
    }
    showTasks() {
        this.updateUI();
    }
}
const myTodoList = new TodoList();
(_a = document.getElementById("addTaskButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput");
    if (taskInput) {
        myTodoList.addTask(taskInput.value);
        taskInput.value = "";
    }
});
(_b = document.getElementById("showTasksButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
    myTodoList.showTasks();
});
