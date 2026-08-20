const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-title");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const filterControls = document.querySelectorAll(".filter");

let tasks = [];
let selectedFilter = "all";

function matchesFilter(task) {
  return (
    selectedFilter === "all" ||
    (selectedFilter === "active" && !task.completed) ||
    (selectedFilter === "completed" && task.completed)
  );
}

function updateTaskCount() {
  const remaining = tasks.reduce(
    (total, task) => total + (task.completed ? 0 : 1),
    0,
  );
  taskCount.textContent = `${remaining} tasks remaining`;
}

function renderTasks() {
  taskList.replaceChildren();
  const visibleTasks = tasks.filter(matchesFilter);
  visibleTasks.forEach((task) => {
    const row = document.createElement("li");
    row.className = `task${task.completed ? " completed" : ""}`;
    const toggle = document.createElement("button");
    toggle.className = "task-toggle";
    toggle.type = "button";
    toggle.setAttribute(
      "aria-label",
      task.completed
        ? `Mark active: ${task.title}`
        : `Mark complete: ${task.title}`,
    );
    toggle.addEventListener("click", () => {
      task.completed = !task.completed;
      renderTasks();
      updateTaskCount();
    });
    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;
    row.append(toggle, title);
    taskList.append(row);
  });
  emptyState.hidden = visibleTasks.length > 0;
}

function render() {
  renderTasks();
  updateTaskCount();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (title.length === 0) return;
  tasks.push({ title, completed: false });
  taskInput.value = "";
  taskInput.focus();
  render();
});

filterControls.forEach((control) =>
  control.addEventListener("click", () => {
    selectedFilter = control.dataset.filter;
    filterControls.forEach((filter) =>
      filter.classList.toggle("is-selected", filter === control),
    );
    renderTasks();
  }),
);

render();
