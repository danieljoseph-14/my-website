const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  const task = { text: text, completed: false };
  createTaskElement(task);
  saveTask(task);

  taskInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");
li.setAttribute("draggable", true);

  const span = document.createElement("span");
  span.textContent = task.text;
  span.classList.add("task-text");

  if (task.completed) {
    span.classList.add("completed");
  }

  span.addEventListener("click", function () {
    span.classList.toggle("completed");
    task.completed = !task.completed;
    updateStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", function () {
    li.style.transform = "scale(0.8)";
    li.style.opacity = "0";
    setTimeout(() => {
      li.remove();
      removeTask(task.text);
    }, 300);
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
}

function removeTask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
  const allTasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector(".task-text").textContent;
    const completed = li.querySelector(".task-text").classList.contains("completed");
    allTasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}
function filterTasks(type) {
  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(li => {
    const textSpan = li.querySelector(".task-text");
    const isCompleted = textSpan.classList.contains("completed");

    if (type === "all") {
      li.style.display = "flex";
    } 
    else if (type === "active") {
      li.style.display = isCompleted ? "none" : "flex";
    } 
    else if (type === "completed") {
      li.style.display = isCompleted ? "flex" : "none";
    }
  });
}