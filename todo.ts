interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

class TodoList {
  public todos: TodoItem[] = [];
  private nextId: number = 1;

  addTask(task: string): void {
    if (task.trim() !== "") {
      this.todos.push({ id: this.nextId++, task, completed: false });
    }
  }

  removeTask(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.updateUI();
  }

  toggleTaskCompletion(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.updateUI();
    }
  }

  editTask(id: number, newTask: string): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.task = newTask;
      this.updateUI();
    }
  }

  updateUI(): void {
    const taskList = document.getElementById("taskList");
    if (taskList) {
      taskList.innerHTML = "";
      this.todos.forEach((todo) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${todo.task} - ${
          todo.completed ? "Completed" : "Not Completed"
        }`;

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

  showTasks(): void {
    this.updateUI();
  }
}

const myTodoList = new TodoList();

document.getElementById("addTaskButton")?.addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  if (taskInput) {
    myTodoList.addTask(taskInput.value);
    taskInput.value = "";
  }
});

document.getElementById("showTasksButton")?.addEventListener("click", () => {
  myTodoList.showTasks();
});
