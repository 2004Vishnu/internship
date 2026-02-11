let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("content");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push({ text, completed: false });
  input.value = "";

  saveTasks();
  displayTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);

  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
    displayTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function removeAll() {
  if (!confirm("Clear all tasks?")) return;

  tasks.length = 0;
  saveTasks();
  displayTasks();
}

function displayTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  tasks.forEach((task, index) => {
    ul.innerHTML += `
      <li class="${task.completed ? "completed" : ""}">
        <div class="task-left">
          <input type="checkbox"
                 ${task.completed ? "checked" : ""}
                 onchange="toggleComplete(${index})">
          <span>${task.text}</span>
        </div>

        <div class="actions">
          <button class="edit-btn" onclick="editTask(${index})">✏️</button>
          <button class="delete-btn" onclick="deleteTask(${index})">✕</button>
        </div>
      </li>
    `;
  });
}

displayTasks();