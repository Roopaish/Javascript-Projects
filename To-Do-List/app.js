// DOM
const addTodo = document.querySelector(".add");
const Todolist = document.querySelector(".list");
const deleteButton = document.querySelector(".delete");
const completedButton = document.querySelector(".completed");
const filterButton = document.getElementsByName("filter");
const err = document.querySelector(".error");
let todos;

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
addTodo.addEventListener("click", addTodos);
document.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodos();
  }
});
deleteButton.addEventListener("click", deleteTodos);
completedButton.addEventListener("click", completedTodos);

// Functions

function getTodos() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    addHTML(todo);
  });
}

function addTodos() {
  const newTask = document.getElementById("task");
  if (!checkRedundancy(newTask.value)) {
    addHTML(newTask.value);
    saveLocalTodos(newTask.value);
  }
}

function checkRedundancy(todo) {
  let i;
  for (i = 0; i < todos.length; i++) {
    if (todos[i].toLowerCase() == todo.toString().toLowerCase()) {
      break;
    }
  }
  if (i == todos.length) {
    return false;
  } else {
    if (confirm("Duplicate task! Do you want to add it anyway?")) {
      return false;
    } else {
      return true;
    }
  }
}

function addHTML(task) {
  Todolist.innerHTML += `
  <div class="todo">
    <li>
      <span class="task-value">${task}</span>

      <button class="completed">
        <i class="fa fa-trash-alt fa-2x"></i>
      </button>

      <button class="delete">
        <i class="fa fa-check fa-2x"></i>
      </button>

    </li>
  </div>
 `;
  err.innerText = "";
}

function saveLocalTodos(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteTodos(e) {}

function completedTodos(e) {}
