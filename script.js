function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", function () {
    li.style.transform = "scale(0.9)";
    li.style.opacity = "0";
    setTimeout(() => li.remove(), 300);
  });

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}