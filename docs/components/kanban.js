class KanbanBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
          @import url('../css/common.css');
          @import url('../css/kanban.css');
        </style>
        <div class="kanban-board">
          <div class="column" id="todo">
            <h2>To Do</h2>
            <div class="tasks" id="todo-tasks"></div>
            <div class="add-task">
              <input type="text" id="new-task-todo" placeholder="New task...">
              <button id="add-task-todo">Add Task</button>
            </div>
          </div>
          <div class="column" id="in-progress">
            <h2>In Progress</h2>
            <div class="tasks" id="in-progress-tasks"></div>
            <div class="add-task">
              <input type="text" id="new-task-in-progress" placeholder="New task...">
              <button id="add-task-in-progress">Add Task</button>
            </div>
          </div>
          <div class="column" id="done">
            <h2>Done</h2>
            <div class="tasks" id="done-tasks"></div>
            <div class="add-task">
              <input type="text" id="new-task-done" placeholder="New task...">
              <button id="add-task-done">Add Task</button>
            </div>
          </div>
        </div>
        <div class="clear-tasks">
          <button id="clear-all-tasks">Clear All Tasks</button>
        </div>
      `;

    this.loadTasks();
    this.addEventListeners();
  }

  addEventListeners() {
    this.shadowRoot
      .getElementById("add-task-todo")
      .addEventListener("click", () => this.addTask("todo"));
    this.shadowRoot
      .getElementById("add-task-in-progress")
      .addEventListener("click", () => this.addTask("in-progress"));
    this.shadowRoot
      .getElementById("add-task-done")
      .addEventListener("click", () => this.addTask("done"));
    this.shadowRoot
      .getElementById("clear-all-tasks")
      .addEventListener("click", () => this.clearAllTasks());

    ["todo", "in-progress", "done"].forEach((status) => {
      const column = this.shadowRoot.getElementById(status);
      column.addEventListener("dragover", (e) => this.dragOver(e));
      column.addEventListener("drop", (e) => this.drop(e));
    });
  }

  loadTasks() {
    ["todo", "in-progress", "done"].forEach((status) => {
      const tasks = JSON.parse(localStorage.getItem(status)) || [];
      const taskContainer = this.shadowRoot.getElementById(`${status}-tasks`);
      taskContainer.innerHTML = "";
      tasks.forEach((task) => {
        if (task && task.content) {
          const taskElement = this.createTaskElement(task);
          taskContainer.appendChild(taskElement);
        }
      });
    });
  }

  saveTasks(status, tasks) {
    localStorage.setItem(status, JSON.stringify(tasks));
  }

  addTask(status) {
    const input = this.shadowRoot.getElementById(`new-task-${status}`);
    const taskContent = input.value.trim();
    if (taskContent) {
      const task = { id: Date.now(), content: taskContent };
      const tasks = JSON.parse(localStorage.getItem(status)) || [];
      tasks.push(task);
      this.saveTasks(status, tasks);
      const taskElement = this.createTaskElement(task);
      this.shadowRoot
        .getElementById(`${status}-tasks`)
        .appendChild(taskElement);
      input.value = "";
    }
  }

  createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.textContent = task.content;
    taskElement.draggable = true;
    taskElement.dataset.id = task.id;
    taskElement.addEventListener("dragstart", (e) => this.dragStart(e));
    return taskElement;
  }

  dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.id);
    e.dataTransfer.effectAllowed = "move";
  }

  dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  drop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const taskElement = this.shadowRoot.querySelector(`[data-id='${taskId}']`);
    if (!taskElement) return; // タスクが存在しない場合は何もしない
    const originContainer = taskElement.parentElement;
    const originStatus = originContainer.id.split("-")[0];
    const targetContainer = e.target.closest(".column").querySelector(".tasks");
    const targetStatus = targetContainer.id.split("-")[0];

    if (originContainer !== targetContainer) {
      const taskContent = taskElement.textContent;
      const tasksOrigin = JSON.parse(localStorage.getItem(originStatus)) || [];
      const tasksTarget = JSON.parse(localStorage.getItem(targetStatus)) || [];

      const taskIndex = tasksOrigin.findIndex(
        (task) => task.id === parseInt(taskId)
      );
      if (taskIndex === -1) return; // タスクが見つからない場合は何もしない
      const [task] = tasksOrigin.splice(taskIndex, 1);
      tasksTarget.push(task);

      this.saveTasks(originStatus, tasksOrigin);
      this.saveTasks(targetStatus, tasksTarget);

      targetContainer.appendChild(taskElement);
    }
  }

  clearAllTasks() {
    ["todo", "in-progress", "done"].forEach((status) => {
      localStorage.removeItem(status);
      const taskContainer = this.shadowRoot.getElementById(`${status}-tasks`);
      taskContainer.innerHTML = "";
    });
  }
}

customElements.define("kanban-board", KanbanBoard);
