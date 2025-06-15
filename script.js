// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  loadTasks();

  // Attach event listener to the "Add Task" button
  addButton.addEventListener("click", addTask);

  // Attach event listener to the input field for "Enter" key
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Function to add a new task
  function addTask(taskText = null, save = true) {
    // Get and trim the task text from input or provided argument
    const text = taskText || taskInput.value.trim();

    // Check if task text is empty
    if (text === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new <li> element
    const listItem = document.createElement("li");
    listItem.textContent = text;

    // Create a new button for removing the task
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Assign onclick event to remove the <li> from taskList
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
      // Update Local Storage after removal
      updateLocalStorage();
    };

    // Append the remove button to the <li> element
    listItem.appendChild(removeButton);

    // Append the <li> to the taskList
    taskList.appendChild(listItem);

    // Clear the task input field
    taskInput.value = "";

    // Save to Local Storage if save is true
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(text);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }
  }

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => addTask(taskText, false)); // false prevents re-saving
  }

  // Function to update Local Storage after task removal
  function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map(
      (li) => li.firstChild.textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
