const form = document.querySelector("#task-form");
const input = document.querySelector("#task-title");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const count = document.querySelector("#task-count");
const filterButtons = document.querySelectorAll(".filter");
const visibleLabel = document.querySelector("#visible-label");

let tasks = [];
let currentFilter = "all";

function visibleTasks() {
  if (currentFilter === "active")
    return tasks.filter((task) => !task.completed);
  if (currentFilter === "completed")
    return tasks.filter((task) => task.completed);
  return tasks;
}

function render() {
  const shown = visibleTasks();
  list.replaceChildren(
    ...shown.map((task) => {
      const item = document.createElement("li");
      item.className = `task${task.completed ? " completed" : ""}`;
      const toggle = document.createElement("button");
      toggle.className = "task-toggle";
      toggle.type = "button";
      toggle.setAttribute(
        "aria-label",
        `${task.completed ? "Mark active" : "Mark complete"}: ${task.title}`,
      );
      toggle.addEventListener("click", () => {
        task.completed = !task.completed;
        render();
      });
      const title = document.createElement("span");
      title.className = "task-title";
      title.textContent = task.title;
      item.append(toggle, title);
      return item;
    }),
  );
  emptyState.hidden = shown.length > 0;
  count.textContent = `${tasks.filter((task) => !task.completed).length} tasks remaining`;
  visibleLabel.textContent =
    currentFilter === "all"
      ? "ALL TASKS"
      : `${currentFilter.toUpperCase()} TASKS`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;
  tasks.push({ title, completed: false });
  input.value = "";
  input.focus();
  render();
});

filterButtons.forEach((button) =>
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filter) =>
      filter.classList.toggle("active", filter === button),
    );
    render();
  }),
);

render();
