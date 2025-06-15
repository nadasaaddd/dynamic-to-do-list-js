// Wait for the document to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  loadTasks();

  // Add event listener for adding a new task
  addButton.addEventListener("click", addTask);

  // Allow adding task with Enter key
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // -----------------------------------------------------------------------------

  // Loading from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((task) => addTask(task, false)); // false = don't save again
  }

  // Saving to Local Storage
  function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map((li) =>
      li.firstChild.textContent.trim()
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // -----------------------------------------------------------------------------

  // addTask with optional save
  function addTask(taskText = "", save = true) {
    // If taskText is empty, get from input
    if (taskText.trim() === "") {
      taskText = taskInput.value.trim();
    }

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create a Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasksToLocalStorage();
    };
    li.appendChild(removeBtn);

    // Add the new task to the list
    taskList.appendChild(li);
    taskInput.value = "";
    taskInput.focus();

    // Save to Local Storage if applicable
    if (save) {
      saveTasksToLocalStorage();
    }
  }
});
