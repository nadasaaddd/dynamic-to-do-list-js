// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage
  loadTasks();

  // Add event listener to the "Add Task" button
  addButton.addEventListener("click", addTask);

  // Add event listener to the input field for "Enter" key
  taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Function to add a new task
  function addTask(taskText = null, save = true) {
    // Use provided taskText (from Local Storage) or get from input and trim
    const text = taskText || taskInput.value.trim();

    // Check if the task text is empty
    if (text === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new <li> element
    const listItem = document.createElement("li");
    listItem.textContent = text;

    // Create a "Remove" button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Add click event listener to remove the task
    removeButton.addEventListener("click", () => {
      // Remove the <li> from the task list
      taskList.removeChild(listItem);

      // Update Local Storage after removal
      updateLocalStorage();
    });

    // Append the remove button to the <li>
    listItem.appendChild(removeButton);

    // Append the <li> to the task list
    taskList.appendChild(listItem);

    // Clear the input field if adding via input
    if (!taskText) {
      taskInput.value = "";
    }

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
