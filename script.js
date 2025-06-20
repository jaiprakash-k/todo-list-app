const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <div class="task-text" onclick="toggleTask(${index})">
    ${task.text}
    ${task.dueDate ? `<br><small>📅 Due: ${task.dueDate}</small>` : ""}
  </div>
  <div class="task-actions">
    <button onclick="editTask(${index})" class="edit-btn"><i class="fas fa-edit"></i></button>
    <button onclick="deleteTask(${index})" class="delete-btn"><i class="fas fa-trash-alt"></i></button>
  </div>
`;
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function addTask() {
  const text = taskInput.value.trim();
  const dueDate = document.getElementById('due-date').value;

  if (text) {
    tasks.push({ text, completed: false, dueDate });
    taskInput.value = "";
    document.getElementById('due-date').value = "";
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (confirmDelete) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask);

// ✅ Press "Enter" to add task
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Initial render
renderTasks();