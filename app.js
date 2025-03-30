document.addEventListener("DOMContentLoaded", function () {
  // Lấy tham chiếu đến các phần tử HTML cần thiết
  const newTaskInput = document.getElementById("new-task");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");
  const taskCount = document.getElementById("task-count");
  const clearBtn = document.getElementById("clear-btn");

  // Tạo mảng chứa danh sách task
  let tasks = [];

  // Hàm cập nhật hiển thị trạng thái rỗng
  function updateEmptyState() {
    if (tasks.length === 0) {
      emptyState.style.display = "block";
      taskList.style.display = "none";
    } else {
      emptyState.style.display = "none";
      taskList.style.display = "block";
    }
  }

  // Hàm cập nhật số lượng task còn lại
  function updateTaskCount() {
    const remainingTasks = tasks.filter((task) => !task.completed).length; // return ra số task chưa hoàn thành
    taskCount.textContent = `${remainingTasks} task${
      remainingTasks == 1 ? "s" : ""
    } remaining`;
  }

  // Hàm hiển thị danh sách task
  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      // Tạo phần tử li cho mỗi task
      const li = document.createElement("li");
      if (task.completed) {
        li.classList.add("completed");
      }
      
      // Thiết lập nội dung HTML cho phần tử task
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

      // Thêm sự kiện cho checkbox
      const checkbox = li.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("change", () => {
        toggleTaskComplete(index);
      });

      // Thêm button xóa task
      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => {
        deleteTask(index);
      });

      // Thêm button edit task
      const editBtn = li.querySelector(".edit-btn");
      editBtn.addEventListener("click", () => {
        editTask(index);
      });

      // Thêm task mới
      taskList.appendChild(li);
    });

    // Cập nhật trạng thái hiển thị
    updateEmptyState();
    updateTaskCount();
  }

  // Hàm đánh dấu task hoàn thành/chưa hoàn thành
  function toggleTaskComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  }

  // Hàm xóa tasks
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  // Hàm chỉnh sửa tasks
  function editTask(index) {
    const task = tasks[index];
    const newText = prompt("Edit task", task.text);
    if (newText !== null) {
      task.text = newText.trim() || task.text;
      renderTasks();
    }
  }

  // Hàm thêm task
  function addTask() {
    const taskNew = newTaskInput.value.trim();
    if (taskNew) {
      tasks.push({
        text: taskNew,
        completed: false,
      });
      newTaskInput.value = "";
      renderTasks();
    }
  }

  // Hàm xóa tất cả các task đã hoàn thành
  function clearCompletedTasks() {
    tasks = tasks.filter((task) => !task.completed);
    renderTasks();
  }

  // Thêm sự kiện vào nút add
  addBtn.addEventListener("click", addTask);

  // Thêm sự kiện khi nhấn Enter trong input
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      addTask();
    }
  });

  // Thêm sự kiện cho nút xóa các task đã hoàn thành
  clearBtn.addEventListener("click", clearCompletedTasks);
});
