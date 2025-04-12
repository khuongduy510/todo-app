document.addEventListener("DOMContentLoaded", function () {
  const newTaskInput = document.getElementById("new-task");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");
  const taskCount = document.getElementById("task-count");
  const clearBtn = document.getElementById("clear-btn");

  // Đọc tasks từ localStorage nếu có
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateEmptyState() {
    if (tasks.length === 0) {
      emptyState.style.display = "block";
      taskList.style.display = "none";
    } else {
      emptyState.style.display = "none";
      taskList.style.display = "block";
    }
  }

  function updateTaskCount() {
    const remainingTasks = tasks.filter((task) => !task.completed).length;
    taskCount.textContent = `${remainingTasks} task${remainingTasks == 1 ? "" : "s"} remaining`;
  }

  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      if (task.completed) {
        li.classList.add("completed");
      }

      li.innerHTML = `
        <div class="task">
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
        </div>
        <div class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
      `;

      li.querySelector('input[type="checkbox"]').addEventListener("change", () => {
        toggleTaskComplete(index);
      });

      li.querySelector(".delete-btn").addEventListener("click", () => {
        deleteTask(index);
      });

      li.querySelector(".edit-btn").addEventListener("click", () => {
        editTask(index);
      });

      taskList.appendChild(li);
    });

    updateEmptyState();
    updateTaskCount();
    saveTasks(); // cập nhật vào localStorage
  }

  function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  function editTask(index) {
    const task = tasks[index];
    const newText = prompt("Edit task", task.text);
    if (newText !== null) {
      task.text = newText.trim() || task.text;
      renderTasks();
    }
  }

  function addTask() {
    const taskNew = newTaskInput.value.trim();
    if (taskNew) {
      tasks.push({ text: taskNew, completed: false });
      newTaskInput.value = "";
      renderTasks();
    }
  }

  function clearCompletedTasks() {
    tasks = tasks.filter((task) => !task.completed);
    renderTasks();
  }

  addBtn.addEventListener("click", addTask);
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      addTask();
    }
  });
  clearBtn.addEventListener("click", clearCompletedTasks);

  // Hiển thị tasks ban đầu
  renderTasks();
});
